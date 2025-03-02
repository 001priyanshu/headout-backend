const mongoose = require('mongoose');

const dbConnect = async() => {
  try {
    mongoose.connect(process.env.MOGOURL, {
      useUnifiedTopology: true
    })
    console.log("MongoDB Connected Successfully!");
  }catch(err){
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
}

module.exports = dbConnect;