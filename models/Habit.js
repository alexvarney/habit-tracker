const mongoose = require('mongoose')

const habitSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    requiresUpdate: {
        type: Boolean,
        default: true,
    },
    occurrences: [{
        type: Date,
        default: Date.now
    }],
    color: {
        type: String,
        default: '#A2CBE2'
    }
})

const Habit = mongoose.model('Habit', habitSchema)

module.exports = Habit