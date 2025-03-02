const express = require("express");
const router = express.Router();
const destiantionRouter = require("./destinationRoutes");
const userRouter = require("./userRoutes");

router.use("/destinations", destiantionRouter);
router.use("/users", userRouter);

module.exports = router;


