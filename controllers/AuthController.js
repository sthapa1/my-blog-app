const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {

    async register(req, res){
        try {
            const {firstname, lastname, email, password} = req.body;

            // Check for email and password validation
            if(!(email && password)){
                return res.status(400).json({message: 'Email and password are required fields.'})
            }

            // check if user with email already exists
            const oldUser = await User.findOne({email});

            if(oldUser){
                return res.status(400).json({message: 'Email already exists.'})
            }

            // Encrypt password -- npm package - bcrypt
            const encryptedPassword = await bcrypt.hash(password, 10);
            // register user
            const user= await User.create({
                email, password: encryptedPassword, firstname, lastname
            });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({error: 'Something went wrong.'})
        }

    }

    async login(req, res){
        const {email, password} = req.body;
        // Check for email and password validation
        if(!(email && password)){
            return res.status(400).json({message: 'Email and password are required fields.'})
        }

        // Find user with given email

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: 'User not found with given credentials.'})
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message: 'Incorrect Password.'})
        }

        // Generate
        const token = jwt.sign({user_id: user._id, email: user.email}, process.env.JWT_SECRET_KEY, {expiresIn: '24h'});

        res.status(200).json({token});        

    }
}

module.exports = AuthController;