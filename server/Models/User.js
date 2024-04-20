const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    interests: Array,
    following: Array,
    },
    {collection : "users"}
);

module.exports = mongoose.model("user", userSchema)