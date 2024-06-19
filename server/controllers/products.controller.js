const { Product } = require('../models');
const path = require('path');
const fs = require('fs');

const addProduct = async (req, res) => {
    const { name, desc, SKU, category_id, price, stocks } = req.body;
    const userId = req.user.userId;

    if (!req.file) {
        return res.status(400).json({ error: 'Image is required' });
    }

    const productImage = path.join('/productImages', req.file.filename);

    try {
        const newProduct = await Product.create({
            name,
            desc,
            SKU,
            category_id,
            price,
            stocks,
            userId,
            productImage,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Unable to create product' });
    }
};


const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, desc, SKU, category_id, price, stocks } = req.body;
    const userId = req.user.userId;
    try {
        const product = await Product.findOne({ where: { productId: id, userId } });

        if (!product) {
            return res.status(404).json({ error: 'Product not found or you do not have permission to edit' });
        }

   
        product.name = name || product.name;
        product.desc = desc || product.desc;
        product.SKU = SKU || product.SKU;
        product.category_id = category_id || product.category_id;
        product.price = price || product.price;
        product.stocks = stocks || product.stocks;

        if (req.file) {
           
            if (product.productImage && fs.existsSync(`public${product.productImage}`)) {
                fs.unlinkSync(`public${product.productImage}`);
            }

            product.productImage = path.join('/productImages', req.file.filename);
        }

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Unable to update product' });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const product = await Product.findOne({ where: { id, userId } });

        if (!product) {
            return res.status(404).json({ error: 'Product not found or you do not have permission to delete' });
        }

        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete product' });
    }
}

const getProduct = async (req, res) => {
    const userId = req.user.userId;
    try {
        const products = await Product.findAll({ where: { userId } });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch products' });
    }
}


module.exports = { addProduct, updateProduct, deleteProduct, getProduct};