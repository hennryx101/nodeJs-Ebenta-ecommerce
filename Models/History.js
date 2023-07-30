const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const history = new Schema({
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
        type: Date
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
    canceldate: {
        type: Date,
        default: Date.now()
    }
});

const History = mongoose.model("History", history);
module.exports = History;