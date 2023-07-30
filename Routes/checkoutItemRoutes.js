
const express = require('express');
const router = express.Router();

const { requireAuth } = require("../Middleware/authMiddleware");
const { removeCheckoutItem } = require("../Controlers/shopingController");

router.route("/removchekoutItem/:id").delete(requireAuth, removeCheckoutItem);

module.exports = router;
