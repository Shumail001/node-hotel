const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    work: {
        type: String,
        enum: ['chef', 'manager', 'waiter'], 
        default: 'chef',
        required: true,
    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, 
{ timestamps: true });

// Add the pre-save hook to hash the password before saving
personSchema.pre("save", async function(next) {
    const person = this;
    
    // Hash the password if it has been modified
    if (!person.isModified("password")) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next();
    } catch (err) {
        return next(err);
    }
});

// Method to compare passwords
personSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        throw err;
    }
};

// Define the model after configuring the schema
const Person = mongoose.model("person", personSchema);

module.exports = Person;
