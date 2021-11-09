const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGO_URL).then((client)=>{
        console.log('DB connected successfully.')    
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = connectDB;