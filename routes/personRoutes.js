const express = require("express")

router = express.Router()
const {jwtAuthMiddleware,generateToken} = require("./../jwt")
const Person = require("../models/person")

router.post("/signup", async(req,res) => {
    try{
        const data = req.body;
        // create new person document usin g mongoose model
        const newPerson = new Person(data);

        // save the new person to the database
        const response = await newPerson.save()
        const payload = {
            id: response.id,
            username : response.username,
        }

        const token = generateToken(payload)
        console.log(token)

        console.log("Data is Saved")
        return res.status(201).json(response);
    } catch(err){
        console.log(err);
        res.status(500).json("Internal server error");
    }
})


router.post("/login", async(req,res) => {
    try{
        const {username,password} = req.body
        if(!username || ! password){
            return res.status(403).json({"error": "Failed to parse json body"})
        }
        const user = await Person.findOne({username: username});
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({"error": "Invalid username or password"});
        }
        const payload = {
            id: user.id,
            username : user.username,
        }

        const token = generateToken(payload)

        res.status(200).json(token);
    }catch(err){
        console.log(err);
        res.status(500).json("Internal server error");
    }
})

// Profile Route
router.get("/profile",jwtAuthMiddleware,async (req,res) => {
    try{
        userData = req.userToken;
        const userId = userData.id;
        const user = await Person.findById(userId)
         if(!user){
            return res.status(404).json({"error": "User not found with this Id"})
        }
        return res.status(200).json(user)
    }catch(err){
        console.log(err);
        res.status(500).json("Internal server error");
    }
})

router.get("/",jwtAuthMiddleware, async (req,res) => {
    try{
        const data = await Person.find();
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json("Interbal Server Error");
    }
})

// check by work type
router.put("/:workType", async(req,res) => {
    try{
        const workType = req.params.workType;
        if (workType == "chef" || workType == "manager" || workType == "waiter"){
            const result = await Person.find({work: workType})
            return res.status(200).json(result)
        }else{
            return res.status(404).json("Not Found");
        }
        
    }catch(err){
        return res.status(404).json("Not Found");
    }


})
// update the person route
router.put("/update/:id", async(req, res) => {
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new: true,
            runValidators : true,
        });
        if(!response){
            return res.status(400).json("Failed to update");
        }
        return res.status(200).json(response);
    }catch(err){
        return res.status(400).json("Failed to update");
    }
})

router.delete("/remove/:id", async(req,res) => {
    try{
        const personId = req.params.id;
        console.log(personId)
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(400).json("Person not Found with this id")
        }
        return res.status(200).json("User deleted Successfully")
    }catch(err){
        return res.status(500).json("Internal Server Error");
    }
})

module.exports = router;
