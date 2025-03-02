const Destination = require("../models/Destination");
const fs = require("fs");
const path = require("path");
const data = require("../data/destination");
const { v4: uuidv4 } = require("uuid");
const { checkAnswerSchema } = require("../validators/destinationValidator");
const { validateRequest } = require("../validators");

exports.getRandomDestination = async (req, res) => {
    try {
        const destinations = await Destination.aggregate([
            { $sample: { size: 4 } },
        ]);

        if (destinations.length === 0) {
            return res.status(404).json({ message: "No Destination found", success: false });
        }

        const [correctDestination, ...incorrectDestinations] = destinations;
        const options = [correctDestination.city, ...incorrectDestinations.map(dest => dest.city)];
        options.sort(() => Math.random() - 0.5);

        res.json({
            id: correctDestination._id,
            clues: correctDestination.clues,
            options,
            success: true
        });
    } catch (err) {
        console.error("Error fetching random destination:", err);
        res.status(500).json({ message: "Server Error", err, success: false });
    }
};


exports.checkAnswer = async (req, res) => {
    const opts = {
        body: req.body
    }
    const validationResult = validateRequest(checkAnswerSchema, opts);
    if (!validationResult.success) return res.status(400).json({ errors: validationResult.errors });

    const { id, selectedAnswer } = req.body;
    try {
        const destination = await Destination.findById(id);
        if (!destination) {
            res.status(404).json({ message: "destionation not found", success: false });
        }
        if (destination.city !== selectedAnswer) {
            res.json({
                success: true,
                correct: false,
                funFact: destination.funFact
            });
        } else {
            res.json({
                success: true,
                correct: true,
                funFact: destination.funFact
            })
        }
    } catch (err) {
        res.status(500).json({ message: "Server Error", err });
    }
}



exports.seedDatabase = async (req, res) => {
    try {
        const filePath = path.join(__dirname, "../data/destination.json");
        const rawData = fs.readFileSync(filePath, "utf-8");
        const destinations = JSON.parse(rawData);
        await Destination.insertMany(destinations);
        res.json({ message: "Data feeded successfully" });
    } catch (err) {
        console.log(err, 'err');
        res.status(500).json({ message: "Server Error", err });
    }
}