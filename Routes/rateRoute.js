const express = require('express');
const router = express.Router();

const { rateItem } = require("../Controlers/rateController");
router.patch("/rateproduct/:id", rateItem);

module.exports = router;