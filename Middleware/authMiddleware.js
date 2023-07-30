const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const requireAuth= (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect("./accounts/login.html");
            }else{
                req.user = decodedToken;
                next();
            }
        })
    }else{
        res.redirect("./accounts/login.html");
    }
}

const checkUser = (req, res, next) => {

    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
        
    }else {
        res.locals.user = null;
        next();
    }
}

module.exports = {
    requireAuth,
    checkUser
}