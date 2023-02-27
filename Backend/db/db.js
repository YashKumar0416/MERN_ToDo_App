const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path: './config.env'})
const DB = process.env.DATABASE;

const mongoDB = async ()=> {
    mongoose.connect(DB,async (err, result)=> {
        if(err) {
            console.log(err)
        }else {
            console.log('Connected to Database Successfully')
        }
    })
};

module.exports = mongoDB();