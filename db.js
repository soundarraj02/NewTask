const mongoose = require("mongoose");
const ConnectWithDb = () => {
    mongoose.connect("mongodb+srv://soundarraj1271:JbGuZvYk0WR13kiR@soundhar.gakg0r8.mongodb.net/NewTask");

    const db = mongoose.connection;
    db.on("error",console.error.bind(console,"Connection error:"));
    db.once("open",() => {
        console.log("Database Connected");
    });

};
module.exports = {ConnectWithDb};
