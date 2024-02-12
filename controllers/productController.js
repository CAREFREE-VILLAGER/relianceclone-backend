

const Product = require('../models/productModel');

module.exports = {
  
  addProduct: async (req, res) => {
    try {
      const { productName, productId, imageLink, offerPrice, mrp } = req.body;

      
      const existingProduct = await Product.findOne({ productId });
      if (existingProduct) {
        return res.status(400).json({ error: 'Product ID already exists' });
      }

      
      const product = new Product({ productName, productId, imageLink, offerPrice, mrp });

      
      await product.save();

      res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

 
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  
  deleteProductById: async (req, res) => {
    try {
      const productId = req.params.id;

      
      const deletedProduct = await Product.findOneAndDelete({ productId });

      
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
