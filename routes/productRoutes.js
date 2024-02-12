

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.post('/add-product', productController.addProduct);


router.get('/products', productController.getAllProducts);


router.delete('/products/:id', productController.deleteProductById);

module.exports = router;
