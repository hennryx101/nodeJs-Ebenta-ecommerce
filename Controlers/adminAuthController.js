const asyncWrapper = require("../Middleware/asyncWrapper");
const Admin = require("../Models/Admin");
const { generateToken, maxAge } = require("./usersController");

const signUpAdmin = asyncWrapper( async (req, res) => {
    const adminData = req.body;
    const admin = await Admin.create(adminData);
    const token = generateToken(admin._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
    res.status(200).json({ admin: admin._id });
});

module.exports = {
    signUpAdmin
}