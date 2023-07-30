const express = require('express');
const router = express.Router();

const { requireAuth } = require("../Middleware/authMiddleware");
const { addCart, 
        getCart,
        removeCart, 
        updateQuantity, 
        singleItem, 
        checkoutItem, 
        checkItem,
        removeAllCheckoutItems,
        getAllCheckoutItems,
        orderReceive,
        buyNow,
        Cancelitem, 
        getHistory,
        orderAgain } = require("../Controlers/shopingController");

router.route("/addCart").post(requireAuth, addCart).get(requireAuth, getCart);
router.route("/remove/:id").delete(removeCart).patch(updateQuantity).get(singleItem);
router.route("/save").post(requireAuth, checkoutItem).get(requireAuth, getAllCheckoutItems);
router.route("/save/:id").patch(requireAuth, checkItem);
router.route("/removeFromCart").post(removeAllCheckoutItems);
router.route("/orderReceive/:id").patch(orderReceive);
router.route("/buynow").post(requireAuth, buyNow);
router.route("/cancel/:id").patch(Cancelitem);
router.route("/history").get( requireAuth, getHistory);
router.route("/orderagain/:id").get(requireAuth, orderAgain);

module.exports = router;