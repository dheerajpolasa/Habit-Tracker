const mongoose = require('mongoose');

const habitTaskSchema = new mongoose.Schema({
    habitName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Blank'
    },
    date: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'day'
    },
    // Main Habit just like master copy of every habit
    main_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Main'
    }
}, {
    timestamps: true
});

const HabitTask = mongoose.model('HabitTask', habitTaskSchema);
module.exports = HabitTask