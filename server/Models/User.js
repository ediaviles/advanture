const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: Number,
    userName: String,
    firstName: String,
    lastName: String,
    password: String,
    },
    {collection : "users"}
);

module.exports = mongoose.model("user", userSchema)