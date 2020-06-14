const express = require('express');
const port = 8080;
const path = require('path');
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const db = require('./config/mongoose');

const app = express();

app.use(express.urlencoded());
app.use(cookieParser())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('assests'));

app.use('/', require('./routes'));

app.listen(port, function(err) {
    if(err) {
        console.log('Error while listening to port: ', port);
        console.log(err);
        return;
    }
    console.log('Yup, server is running on port: ', port);
})