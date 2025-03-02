
const User = require("../models/User");
const { addUserSchema, updateScoreSchema, getUserSchema } = require("../validators/userValidator");
const { validateRequest } = require("../validators");

exports.addUser = async (req, res) => {
    const opts = {
        body: req.body
    }
    const validationResult = validateRequest(addUserSchema, opts);
    if (!validationResult.success) return res.status(400).json({ errors: validationResult.errors });

    const { userName } = req.body;
    try {
        const u = await User.findOne({ userName: userName });
        if (u) return res.json({ message: "User Added Successfully", user: u, success: true })
        const user = await User.insertOne({ userName });
        console.log(user, 'user');
        res.json({ message: "User Added Successfully", user: user, success: true })
    } catch (err) {
        console.log(err, ';errorr');
        res.status(500).json({ message: "Server Error", err, success: false });
    }

}

exports.updateScore = async (req, res) => {
    const opts = {
        params: req.params,
        body: req.body
    }

    const validationResult = validateRequest(updateScoreSchema, opts);
    if (!validationResult.success) return res.status(400).json({ errors: validationResult.errors });

    const { userId } = req.params;
    const { score } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            res.status(403).json({ message: "User not exist" });
            return;
        }
        let doc = {
            lastScore: score
        }
        if (score > user.greatestScore) doc.greatestScore = score;

        const updatedUser = await User.findByIdAndUpdate(
            userId, doc, { new: true }
        );
        res.json({ message: "User updated successfully", updatedUser, success: true });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error", err, success: false });
    }
}

exports.getUser = async (req, res) => {
    const opts = {
        params: req.params,
    }
   
    const validationResult = validateRequest(getUserSchema, opts);
    if (!validationResult.success) return res.status(400).json({ errors: validationResult.errors });

    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(403).json({ message: "User not exist", success: false });
            return;
        }
        res.json({ user, success: true });
    } catch (err) {
        res.status(500).json({ message: "Server Error", err, success: false });
    }
}