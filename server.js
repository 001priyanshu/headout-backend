require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./src/config/db")

const PORT = process.env.PORT || 5000;

const routes = require("./src/routes/index");
const app = express();

app.use(cors());
app.use(express.json());


dbConnect();

app.use("/api", routes);

app.get('/hello', (req, res)=>{
    return res.send({message:'Hello'});
})

app.listen(PORT, ()=>{
    console.log("Server is running on ", PORT);
})