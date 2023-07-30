const express = require("express");
const router = express.Router();
const { signUpUser, addAddress } = require("../Controlers/userAuthControllers");

router.route("/signup").post(signUpUser);
router.route("/signup/:id").post(addAddress);
module.exports = router;