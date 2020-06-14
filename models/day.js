const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique: true
    },
    // List of habits for a day
    habits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit'
    }]
}, {
    timestamps: true
});
const Day = mongoose.model('Day', daySchema);
module.exports = Day