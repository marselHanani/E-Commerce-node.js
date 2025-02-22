const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
     token = token.split(' ')[1];
     console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};
