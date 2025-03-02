const express = require("express");
const router =  express.Router();

const {getRandomDestination, checkAnswer, seedDatabase} = require("../controllers/destinationController");


router.get("/", getRandomDestination);
router.patch('/answer', checkAnswer);
router.post('/seed', seedDatabase);



module.exports = router;