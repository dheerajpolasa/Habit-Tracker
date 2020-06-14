const mongoose = require('mongoose');
// Master copy of every habit rest all are the clones
const mainSchema = new mongoose.Schema({
    habitName: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

const Main = mongoose.model('Main', mainSchema);
module.exports = Main