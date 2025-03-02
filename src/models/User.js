const mongoose = require("mongoose");
const {v4: uuidv4} = require("uuid");


const userSchema = new mongoose.Schema({
    _id:{
        type: String,
        default: uuidv4
    },
    userName: {
        type: String,
        required: true,
    },
    greatestScore: {
        type: Number,
        default:0
    },
    lastScore: {
        type: Number,
        default:0
    }
}, {timestamps: true});

module.exports = mongoose.model("user", userSchema);