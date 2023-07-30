const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    userid: {
        type: String
    },
    region: {
        type: String
    },
    province: {
        type: String
    },
    municipality: {
        type: String
    },
    baranggay: {
        type: String
    },
    street: {
        type: String
    },
});

const address = mongoose.model("address", addressSchema);
module.exports = address;