const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productId: {
        type: String, 
        required: true,
        unique: true
    },
    imageLink: {
        type: String,
        required: true
    },
    offerPrice: {
        type: Number,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const cartSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        ref: 'User'
    },
    items: [cartItemSchema], 
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
