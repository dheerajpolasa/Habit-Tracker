# Habit-Tracker

The index.js is present at the root level which is responsible for the server.

Models: There are 3 models, they are:
  1. main.js -> Master Copy of Habits
  2. HabitTask.js -> Each copy for every day from the day it is created
  3. day.js -> To hold all habits for a day
  
 Controller: Two controllers, they are:
  1. habit_controller.js -> responsible for update, create, delete, edit of habits
  2. home_controller.js -> responsbile for the home page of the server
  
 Routes: Two routes, they are:
  1. habits.js -> routes all the traffic which comes under '/habit' 
  2. index.js ->  routes all the traffic which comes '/'
  
  Views: Two views, they are:
   1. home.ejs
   2. edit.ejs
  
  config:
   1. mongoose.js -> For mongoDB connection
   
   Start the application just by executing "node index.js" in the project foler
