const express = require("express")

router = express.Router()

const Person = require("../models/person")

router.post("/", async(req,res) => {
    try{
        const data = req.body;
        // create new person document usin g mongoose model
        const newPerson = new Person(data);

        // save the new person to the database
        const response = await newPerson.save()

        console.log("Data is Saved")
        return res.status(201).json(response);
    } catch(err){
        console.log(err);
        res.status(500).json("Internal server error");
    }
})


router.get("/", async (req,res) => {
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
