const jwt = require('jsonwebtoken');

exports.generateToken = (user)=>{
    const token = jwt.sign({
        id: user._id,
        username: user.username,
        role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' });
    return token;
}