const express = require("express");
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require('cors');

const app = express();

// middlewares

app.use(bodyParser.json());
app.use(methodOverride("_method"));


const mongoURL = process.env.MONGO_URL

// const mongoURL = "mongodb://localhost:27017/MyDrive";


const conn = mongoose.createConnection(mongoURL);


app.use(cors())

// app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello,Welcome to MyDrive");
})

const files=require('./routes/files');

app.use('/files',files);


const port = 80;

app.listen(port, () => {
    console.log(`The express app is running on port ${port}`);
})
