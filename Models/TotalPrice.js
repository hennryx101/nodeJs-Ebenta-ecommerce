const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const totalPrice = new Schema({
    userid: {
        type: String
    },
    totalproductprice: {
        type: Number
    }
});

const TotalPrice = mongoose.model("totalprice", totalPrice);
module.exports = TotalPrice;