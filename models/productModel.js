

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
  }
});


const Product = mongoose.model('Product', productSchema, 'products', 'relianceclone');

module.exports = Product;
