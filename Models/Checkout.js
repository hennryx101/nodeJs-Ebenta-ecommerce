const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkout = new Schema({
    userid: {
        type: String,
        required: true
    },
    product: {
        type: Object,
        required: true
    },
    totalprice: {
        type: Number,
        required: true
    },
    orderdate: {
        type: Date,
        default: Date.now()
    },
    accepted: {
        type: Boolean,
        default: false
    },
    receive: {
        type: Boolean,
        default: false
    },
    receivedate: {
        type: Date,
        default: null
    },
    cancelled: {
        type: Boolean,
        default: false
    }
});

checkout.pre("findOneAndUpdate", function (next) {
    const updateFields = this.getUpdate();

    if (updateFields.receive === true && !updateFields.receivedate) {
        updateFields.receivedate = Date.now();
    }
    next();
});

const Checkout = mongoose.model("Checkout", checkout);
module.exports = Checkout;