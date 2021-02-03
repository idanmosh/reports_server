const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require('passport');
const conncectDB = require('./config/db');

//Load config
dotenv.config({ path: './config/config.env' });

require('./config/passport')(passport);

conncectDB();

const app = express();
const http = require('http').createServer(app);

//Logging 
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
);

app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

http.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);