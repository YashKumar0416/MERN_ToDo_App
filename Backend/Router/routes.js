const express = require('express');
const router = express.Router();
require('../db/db');
const User = require('../Model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

//REGISTER NEW USER
router.post('/register', async (req, res)=> {
    const {name, email, phone, work, password} = req.body;

    if(!name || !email || !phone || !work || !password) {
        return res.status(400).json({error: "Fill fields properly"})
    }

    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
        await User.create({
            name, email, phone, work, password: secPassword
        })
        res.status(200).json({success: true})

    } catch (error) {
        console.log(error)
        res.status(400).json({success: false})
    }
})

//LOGIN NEW USER
router.post('/login', async (req, res)=> {
    const {email, password} = req.body;
    let token;

    if(!email ||!password) {
        return res.status(400).json({error: "Enter Details"});
    }

    try {

        // IS USER PRESENT
        const loginuser = await User.findOne({email});
        if(loginuser) {
            
            // PASSWORD MATCHING
            const ismatch = await bcrypt.compare(password, loginuser.password);

            if(!ismatch) {
                return res.status(400).json({error: "Invalid Credentials"})
            } else {

                let data = {
                    loginuser: {
                        id: loginuser._id
                    }
                }

                //JWT TOKEN GENERATION
                let authToken = await jwt.sign(data, process.env.SECRET_KEY);
                return res.status(200).json({message: "User Found",authToken, loginuser})
            }
        } else {
            return res.status(400).json({error: "No user found"})
        }
    } catch (error) {
        console.log(error)
    }
})

//GET USER DETAILS
router.post('/getuser', async(req, res)=> {
    try {
        const {token} = req.body;
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const _id = mongoose.Types.ObjectId(decoded.loginuser.id)
        let userdata = await User.findOne({_id});
        res.status(200).json({userdata})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//UPDATE USER DETAILS
router.post('/updateuser', async (req, res)=> {
    const {token, name, phone, work} = req.body;

    if(!name || !phone || !work) {
        return res.status(400).json({message: "Enter Details Carefully"})
    }
    try {
        const {token} = req.body;
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const _id = mongoose.Types.ObjectId(decoded.loginuser.id)
        const data = await User.findOneAndUpdate({_id},
            {
                "$set": {
                "name": name, "phone": phone, "work": work
            }
        })
        if(data) {
            return res.status(200).json({success: true})
        } else {
            return res.status(400).json({success: false})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success: false})
    }
})


// ADD NEW TASK
router.post('/addtask', async (req, res)=> {

    const {email, task} = req.body;
    if(!task) {
        return res.status(401).json({message: "Enter a task first"})
    }
    const resData = await User.findOne({email})
    try {
        const userMessage = await resData.addTask(task);
        await resData.save();
        res.status(200).json({success: true})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false})
    }
})

//GET ALL TASKS
router.post('/gettasks', async (req, res)=> {
    try {
        const {token} = req.body;
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const _id = mongoose.Types.ObjectId(decoded.loginuser.id)
        let userdata = await User.findOne({_id});
        res.status(200).json({tasks: userdata.tasks})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//DELETE A TASK
router.post('/deletetask', async (req, res)=> {
    const {email, id} = req.body;
    try {

       const user = await User.findOne({email})
       const data = await User.updateOne({
        "_id": user._id
        },
        {
            "$pull": {
            "tasks": {
                "_id": id
            }
            }
        })
        if(data.modifiedCount === 1) {
            return res.json({success: true})
        } else {
            return res.json({success: false})
        }
    } catch (error) {
        res.json({success: false})
        console.log(error)
    }
});

//UPDATE A TASK
router.post('/updatetask', async (req, res)=> {
    const {id, email, task} = req.body;
    try {
        const user = await User.findOne({email})
        const data = await User.updateOne({
            "_id": user._id, "tasks._id": id 
            },
            {
                "$set": {
                "tasks.$.task": task
            }
            },
            {arrayFilters: [{"$._id": id}]
        })
        
        if(data.modifiedCount === 1) {
            return res.json({success: true})
        } else {
            return res.json({success: false})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success: false})
    }
})

module.exports = router;