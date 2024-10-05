const mongoose = require("mongoose")

const mongoUrl = "mongodb://127.0.0.1:27017/hotel"


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
