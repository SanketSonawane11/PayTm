require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

async function verifyLogin(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }
        // const token = authorization.split(' ')[1];
        // if (!token) {
        //     return res.status(401).json({ message: 'Token missing' });
        // }
        try {
            const decoded = jwt.verify(authorization, secret);
            if (decoded.username) {
                req.username = decoded.username;
                next();
            }
        }
        catch (err) {
            res.status(411).json({ message: `Error verifying token\n${err.message}` });
        }
    }
    catch (err) {
        res.status(403).json({ message: `Error verifying user\n${err.message}` })
    }
}

module.exports = verifyLogin;