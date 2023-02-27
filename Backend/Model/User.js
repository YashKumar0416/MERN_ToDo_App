const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    tasks: [ {
        task: {
            type: String
        }
    }
    ],
})

user.methods.addTask = async function(task) {
    try {
        this.tasks = this.tasks.concat({task});
        await this.save();
        return this.task
    } catch (error) {
        console.log(error)
    }
}

module.exports = mongoose.model('NEWUSER', user);