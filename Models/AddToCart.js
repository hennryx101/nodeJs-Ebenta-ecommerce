const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const  cartSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    productid: {
        type: String,
        required: true
    },
    ordercount: {
        type: Number,
        required: true,
        default: 1
    },
    productprice: {
        type: Number,
        require: true
    },
    ischecked: {
        type: Boolean,
        default: false
    },
    addedtocartdate: {
        type: Date,
        default: Date.now()
    }
});

const cart = mongoose.model('cart', cartSchema);
module.exports = cart;