const mongoose = require("mongoose")

const islandSchema = new mongoose.Schema({
    islandId: Number,
    tag: String,
    description: String,
    images: Array,
    owner_id: Number, // or maybe via username
    },
    {collection : "islands"}
);

module.exports = mongoose.model("island", islandSchema)