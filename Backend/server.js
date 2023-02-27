const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./db/db');
const User = require('./Model/User');
const PORT = process.env.PORT;
dotenv.config({path: './config.env'})

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json())
app.use(require('./Router/routes'))

app.listen(PORT, ()=> {
    console.log(`Server listening to port ${PORT}`)
})