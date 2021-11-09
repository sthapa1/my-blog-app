require('dotenv').config()
const express = require('express');
var morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

// Connect to Database
connectDB();

app.listen(process.env.PORT, ()=>{
    console.log('Server is running on PORT: ' + process.env.PORT)
})

