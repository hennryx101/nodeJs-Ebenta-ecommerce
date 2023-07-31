const asyncWrapper = require("../Middleware/asyncWrapper");
const jwt = require('jsonwebtoken');
const Admin = require("../Models/Admin");
const User = require("../Models/User");

const getUser = async (req, res) => {
    const id = req.user.id;
    try {
        if(id){
            let user = await User.findById(id);
            if(!user){
                user = await Admin.findById(id);
            }
            const name = user.username;
            req.user = name;
            res.status(200).json({ user: { name: name, isAdmin: user.isAdmin, id: user._id }});
        }else{
            res.status(404).json({errors: error});
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({errors: error});
    }
}

const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1});
    res.status(200).json({ redirect: '/'});
}

const maxAge = 3 * 24 * 60 * 60;
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: maxAge
    });
}


const loginuser =  asyncWrapper (async (req, res) => {
    const { email, password } = req.body;

        let user = await User.login(email, password);
        if(user === null){
            user = await Admin.login(email, password);
        } 
        
        const token = generateToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({ user: user._id });
});



module.exports = {
    getUser,
    logout,
    generateToken,
    loginuser,
    maxAge
}