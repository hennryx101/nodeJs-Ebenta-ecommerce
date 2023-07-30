const express = require("express");
const router = express.Router();

const { requireAuth } = require("../Middleware/authMiddleware");
const { getUser, logout, loginuser } =  require("../Controlers/usersController");

router.route("/login").post(loginuser);
router.route("/logout").get(logout);
router.route("/user").get(requireAuth, getUser);

module.exports = router;