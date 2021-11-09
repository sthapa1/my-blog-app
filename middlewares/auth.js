const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if(!token){
            return res.status(403).json({message: 'Unauthorized'});
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(403).json({message: 'Invalid token.'})
    }
}

module.exports = {verifyToken}