const express = require("express")

menuRouter = express.Router()

const MenuItem = require("../models/MenuItem")


menuRouter.post("/", async(req,res) => {
    try{
        const data = req.body;

        const newItem = new MenuItem(data)

        const response = await newItem.save();
        return res.status(201).json(response)
    }catch(err){
        console.log(err)
        return res.status(500).json("Internal Server Error")
    }
})

menuRouter.get("/", async(req,res) => {
    try{
        const data = await MenuItem.find();
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json("Interbal Server Error");
    }
});

menuRouter.put("/:taste", async(req,res) => {
    try{
        const taste = req.params.taste;
        if(taste == "sweet" || taste == "normal" || taste == "spice"){
            console.log(taste)
            const result = await MenuItem.find({taste: taste});
            return res.status(200).json(result);
        }else{
            return res.status(404).json("Not Found");
        }
    }catch(err){
        return res.status(404).json("Not Found");
    }
})

router.delete("/remove/:id", async(req,res) => {
    try{
        const menuId = req.params.id;
        console.log(menuId)
        const response = await Person.findByIdAndDelete(menuId);
        if(!response){
            return res.status(400).json("Menu not Found with this id")
        }
        return res.status(200).json("Menu deleted Successfully")
    }catch(err){
        return res.status(500).json("Internal Server Error");
    }
})



module.exports = menuRouter;