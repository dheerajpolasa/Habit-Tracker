const HabitTask = require('../models/HabitTask');
const Main = require('../models/main');
const DaySchema = require('../models/day');
const dateFormat = require('dateformat');
const Day = require('../models/day');

// To create the habit
module.exports.create = async function(req, res) {
    try {
        console.log(req.body);
        let habit = await Main.findOne({habitName: req.body.habit});
        if(habit) {
            console.log('Habit with this name already exists, provide another name');
            return res.redirect('back');
        }
        let mainTask = await Main.create({ habitName: req.body.habit});
        let cur = new Date();
        for(let day=0; day < 7; day++) {
            let date = new Date(cur);
            date.setDate(cur.getDate() - day);
            let dateKey = dateFormat(date, 'yyyy-mm-dd');
            console.log(dateKey);
            let dateModel = await DaySchema.findOne({date: dateKey});
            if(!dateModel || dateModel === null) {
                dateModel = await DaySchema.create({date: dateKey});
            }
            habit = await HabitTask.create({
                habitName: req.body.habit, date: dateKey, main_id: mainTask.id, date: dateModel._id
            });
            dateModel.habits.push(habit);
            dateModel.save();
        }
        return res.redirect('back');
    } catch(err) {
        console.log('Error', err);
        return res.redirect('back');
    }
}

// To print all habits on particular day
module.exports.dayTasks = async function(req, res) {
    try {
        console.log(new Date());
        let tasks = await DaySchema.findById({date: req.body.date});
        console.log(tasks);
        // req.flash('success', 'print all tasks');
        return res.render('just', {
            message: 'got data',
            tasks: tasks
        })
    } catch(err) {
        console.log('Error', err)
        return res.redirect('back');
    }
}

// To delete the habits
module.exports.destroy = async function(req, res) {
    try {
        let mainHabit = await Main.findById(req.params.id);
        console.log(mainHabit)
        let habits = await HabitTask.find({main_id: mainHabit.id});
        console.log(habits);
        for(let habit of habits) {
            console.log(habit);
            let date = habit['date'];
            for(let day=0; day < 7; day++) {
                date = new Date(date);
                date.setDate(date.getDate() - day);
                let curdate = dateFormat(date-day, 'yyyy-mm-dd');
                console.log(curdate);
                await DaySchema.findOneAndUpdate({date: curdate}, {$pull: {habits: habit.id}})
            }
            await habit.remove();
        }
        await mainHabit.remove();
        return res.redirect('back');
    } catch(err) {
        console.log('Error', err);
        return res.redirect('back');
    }
}

// To edit the habits
module.exports.edit = async function(req, res) {
    try {
        let mainHabit = await Main.findById(req.params.id).populate('day');
        let habits = await HabitTask.find({main_id: mainHabit.id}).populate('day');
        console.log(habits);
        let responsJSON = [];
        let totalStreak = 0;
        let maintainedStreak = 0, curStreak = 0;
        for(let habit of habits) {
            let date = await DaySchema.findById(habit.date);
            if(habit.status == 'done') {
                maintainedStreak++;
            }
            totalStreak++;
            responsJSON.push({
                habit: habit,
                date: date.date,
                totalStreak: totalStreak,
                maintainedStreak: maintainedStreak
            });
        }
        return res.render('edit', {
            output: responsJSON
        });
    } catch(err) {
        console.log('Error', err);
        return res.redirect('back');
    }
}

module.exports.update = async function(req, res) {
    try {
        let habit = await HabitTask.findById(req.params.id);
        let status = 'status-' + habit.date;
        habit.status = req.body[status];
        await habit.save();
        console.log(habit);
        return res.redirect('back');
    } catch(err) {
        console.log('Error', err);
        return res.redirect('back');
    }
}