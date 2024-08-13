const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Create a new product
router.post('/addProduct', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const { page = 1, sort = 'asc', search = '' } = req.query;
    const productsPerPage = 3;

    const query = search ? { name: new RegExp(search, 'i') } : {};
    const sortOption = { price: sort === 'asc' ? 1 : -1 };

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
                                  .sort(sortOption)
                                  .skip((page - 1) * productsPerPage)
                                  .limit(productsPerPage);

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    res.json({ products, totalPages });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Update a product
router.put('/product:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a product
router.delete('/product:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
