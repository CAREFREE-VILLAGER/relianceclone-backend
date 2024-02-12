

const Cart = require('../models/cartModel');
const Product = require('../models/productModel'); 

const winston = require('winston');


const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

async function getProductDetails(productId) {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw new Error('Error fetching product details: ' + error.message);
    }
}

exports.addToCart = async (req, res) => {
    const { productId } = req.body;
    const { username } = req.decodedToken; 

    try {
        if (!username) {
            return res.status(401).json({ error: 'Please login to add items to cart' });
        }

        if (!productId) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        
        const existingProduct = await Product.findOne({ productId });

        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        let cart = await Cart.findOne({ username });

        if (!cart) {
            
            cart = new Cart({ username, items: [] });
        }

        
        cart.items.push({ 
            productId: existingProduct.productId, 
            quantity: 1, 
            productName: existingProduct.productName,
            imageLink: existingProduct.imageLink,
            offerPrice: existingProduct.offerPrice,
            mrp: existingProduct.mrp
        });

        
        await cart.save();

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




exports.getCartItems = async (req, res) => {
    try {
        
        const { username } = req.decodedToken;

        
        if (!username) {
            return res.status(401).json({ error: 'Please login to see items in cart' });
        }

       
        const cart = await Cart.findOne({ username }).populate('items.productId');

        
        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ items: [] });
        }

        
        res.status(200).json({ items: cart.items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




exports.removeFromCart = async (req, res) => {
    const { productId } = req.params;
    const { username } = req.decodedToken; 

    try {
        
        if (!username) {
            return res.status(401).json({ error: 'Please login to remove items from cart' });
        }

        
        if (!productId || typeof productId !== 'string') {
            return res.status(400).json({ error: 'Invalid productId' });
        }

        
        const cart = await Cart.findOne({ username });

        
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        
        cart.items = cart.items.filter(item => item.productId !== productId);

        
        await cart.save();

        res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
