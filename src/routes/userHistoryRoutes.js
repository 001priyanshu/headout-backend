const express = require("express");
const router = express.Router();
const {startGame} = require("../controllers/userHistoryController");


router.post('/start/:userId', startGame);


module.exports = router;