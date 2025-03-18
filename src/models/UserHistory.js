const mongoose = require("mongoose");
const {v4: uuidv4} = require("uuid");


const userHistorySchema = new mongoose.Schema({
    _id:{
        type: String,
        default: uuidv4
    },
    userId: {
        type: String,
        required: true,
    },
    correctAnswer: {
        type: Number,
        default: 0
    },
    inCorrectAnswer: {
        type: Number,
        default:0
    },
    destinations: {
        type: [Object]
    },
}, {timestamps: true});

module.exports = mongoose.model("userHistory", userHistorySchema);

