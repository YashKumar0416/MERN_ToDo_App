const mongoose = require('mongoose');
const DB = process.env.DATABASE || "mongodb://localhost/ToDo_App";

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
