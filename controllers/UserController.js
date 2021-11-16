const User = require("../models/user");

class UserController {
    async getUserInfo(req, res){
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({message: 'Something went wrong.'})
        }
    }
}

module.exports = UserController;