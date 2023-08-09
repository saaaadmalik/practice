const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req,res,next) =>{
    let token;
    if(req.cookies.token){
        try {
            token = req.cookies.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            if(!req.user){
                res.redirect('/')
            }
            next();
        } catch (error) {
            console.log(error);
        }
    }
    if(!token){
        res.redirect('/')
    }
}
module.exports = protect;