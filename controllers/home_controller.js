const Main = require('../models/main')
const DaySchema = require('../models/day')
const dateFormat = require('date-format');
const addDays = require('date-fns/addDays');
const subDays = require('date-fns/subDays');
const format = require('date-fns/format')

// Home Page
module.exports.home = async function(req, res) {
    try {
        let cur = new Date();
        let cur1 = new Date(cur);
        console.log(cur1);
        let habits = await Main.find({}).sort('-createdAt');
        return res.render('home', {
            title: 'Habits',
            habits: habits,
        })
    } catch(err) {
        console.log('Error', err);
        return res.redirect('back');
    }
};