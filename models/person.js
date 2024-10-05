const mongoose = require("mongoose")

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    work: {
        type: String,
        enum: ['chef', 'manager', 'waiter'], 
        default: 'chef',
        required: true,
    },
    mobile:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
    },
    Salary: {
        type: Number,
        
    }
}, 
 {timestamps: true}
)

const Person = new mongoose.model("person",personSchema);

module.exports = Person