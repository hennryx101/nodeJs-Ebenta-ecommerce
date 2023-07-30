const { strict } = require("assert");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product name cannot be Empty!"],
        minlength: [6, "Product name must be greater than 6"]
    },

    price: {
        type: Number,
        required: [true, "Product price cannot be Empty!"]
    },

    stock: {
        type: Number,
        required: [true, "Product stock cannot be Empty!"]
    },

    description: {
        type: String,
        required: [true, "A Product must have a description"]
    },

    ratings: {
        type: Number,
        maxlength: 1,
        default: 0
    },

    origins: {
        type: String,
        required: [true, "Product origin cannot be Empty!"]
    },

    gallery: {
        type: Array,
        required: [true, "Product image cannot be Empty!"]
    },

    status: {
        type: Boolean,
        default: true
    },

    ratingsnumber: {
        type: [Number],
        default: [] 
    }

}, { timestamps: true });

const Products = mongoose.model("Products", productsSchema);
module.exports = Products;