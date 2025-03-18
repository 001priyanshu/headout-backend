const UserHistorySchema = require('../models/UserHistory');
const User = require("../models/User");


exports.startGame = async(req,res) => {
    try{
        const { userId } = req.params;
        console.log(userId, 'useriD');
        const user = await User.findById(userId);
        if(!user){
            res.status(404).json({
                success: false,
                message: `User not found with ${userId}`
               });
        }
        const userHistory = await UserHistorySchema.insertOne({userId});
        res.status(200).json({
        success: true,
        userHistoryId: userHistory.userId 
       });
    }catch(err){
        console.log(err, 'err');
        res.status(500).json({ message: "Server Error", err });
    }
}

// exports.updateHistory = async(req,res) => {
//     const {userHistoryId, correct} = req.params;
//     const userHistory = await UserHistorySchema.findById(userHistoryId);
//     if(!userHistory){
//         res.status(404).json({
//             success: false,
//             message: `User History not found with ${userHistoryId}`
//            });
//     }
// }