const express = require("express");
const router = express.Router();
const {getUser, addUser, updateScore} = require("../controllers/userController");


router.get('/:userId', getUser);
router.post('/', addUser);
router.patch('/:userId', updateScore)


module.exports = router;