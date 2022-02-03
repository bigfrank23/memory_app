// import express from "express"
const express = require("express");
const app = express()
const PORT = process.env.PORT || 5000
// import cors from "cors"
const cors = require("cors")
// import mongoose from "mongoose"
const mongoose = require("mongoose");
// import postRoutes from "./routes/posts.js"
// const postRoutes = require("./routes/posts")
const dotenv = require('dotenv')


app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
dotenv.config()

// app.use(express.json());




const CONNECTION_URL = process.env.CONNECTION_URL;
// "mongodb+srv://emeka:emeka1234@cluster0.vnlg5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// "mongodb://localhost:27017/memories";


mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=> app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) ).catch((error)=> console.log(error.message))

// mongoose.set('useFindAndModify', 

// app.use("/posts", postRoutes)
app.use("/api/posts", require("./routes/posts"));
app.use("/api/user", require("./routes/users"));

app.get('/', (req, res)=> {
  res.send('Hello to memories api')
})