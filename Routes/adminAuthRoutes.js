const express = require("express");
const router = express.Router();
const { signUpAdmin } = require("../Controlers/adminAuthController")
// const { getUser, logout } =  require("../Controlers/usersController");

router.route("/signup").post(signUpAdmin);


module.exports = router;