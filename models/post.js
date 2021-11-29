const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    category: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        }
    ] ,
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment' 
        }
    ]
   
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);