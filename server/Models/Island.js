const mongoose = require("mongoose")

const islandSchema = new mongoose.Schema({
    islandName: String,
    tags: Array,
    description: String,
    images: Array,
    owner_id: String, // or maybe via username
    },
    {collection : "islands"}
);

module.exports = mongoose.model("island", islandSchema)