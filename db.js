const mongoose = require("mongoose")
require("dotenv").config();

const mongoUrl = process.env.LOCAL_MONGO_URL;

mongoose.connect(mongoUrl)

// Get the Default Connection 
const db = mongoose.connection;

db.on("connected", () => {
    console.log("Mongo db is Connected");
});

db.on("error",(err) => {
    console.log("Mongodb connection error", err);
});

db.on("disconnected", () => {
    console.log("Mongo db is Disconnectd");
});


module.exports = db;
