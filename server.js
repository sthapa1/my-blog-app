require('dotenv').config()
const express = require('express');
var morgan = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Connect to Database
connectDB();

// Routes

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);

app.listen(process.env.PORT, ()=>{
    console.log('Server is running on PORT: ' + process.env.PORT)
})

