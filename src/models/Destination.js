const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const destinationSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    city: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    clues: {
        type: [String],
        required: true
    },
    funFact: {
        type: [String],
        required: true
    },
    trivia: {
        type: [String],
        required: true
    },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("destination", destinationSchema);