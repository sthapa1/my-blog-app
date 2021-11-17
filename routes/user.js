const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();
const userController = new UserController();

router.get('/:id', userController.getUserInfo)

module.exports = router;



// Update user profile - Suraj Shrestha
// Blog Page design - Pragati
// Blog API - Sujan Bista - create, edit, delete, getAll, getOne, likes, getPostByCategory
// Categories API - title, timestamps - create, delete, getAll
// Homepage design - Ranjit
// Comments model, controller, routes - message, createdBy, timestamps - create, delete, 

// 'POST' -> '/posts/:id/comment' req.body

    // Create comment with request body 
        // response = Comment.create()
        // update blog model with the comment ID retrieved on response
        // Add comment it to existing post