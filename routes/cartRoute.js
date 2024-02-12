const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware'); 


router.use(authMiddleware); 


router.post('/add-to-cart', cartController.addToCart);


router.get('/cart-items', cartController.getCartItems);


router.delete('/remove/:productId', cartController.removeFromCart);

module.exports = router;
