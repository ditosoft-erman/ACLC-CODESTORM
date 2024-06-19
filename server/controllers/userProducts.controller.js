const { Category , Product } = require('../models');
const { Op } = require('sequelize');

const getProducts = async (req, res) => {
    try {

        const products = await Product.findAll();
    
        res.status(200).json(products);
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'Unable to retrieve products' });
    }
};

const searchProducts = async (req, res) => {
    const { name, minPrice, maxPrice, categoryName, categoryId } = req.query;

    const whereClause = {};

    if (name) {
        whereClause.name = { [Op.like]: `%${name}%` };
    }

    if (minPrice && maxPrice) {
        whereClause.price = { [Op.between]: [minPrice, maxPrice] };
    } else if (minPrice) {
        whereClause.price = { [Op.gte]: minPrice };
    } else if (maxPrice) {
        whereClause.price = { [Op.lte]: maxPrice };
    }

    const includeClause = [];

    if (categoryName || categoryId) {
        const categoryWhere = {};
        if (categoryName) {
            categoryWhere.name = { [Op.like]: `%${categoryName}%` };
        }
        if (categoryId) {
            categoryWhere.id = categoryId;
        }
        includeClause.push({
            model: Category,
            as: 'category',
            where: categoryWhere
        });
    }

    try {
        const products = await Product.findAll({
            where: whereClause,
            include: includeClause
        });
        res.status(200).json(products);
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ error: 'Unable to search products' });
    }
};

module.exports = { getProducts, searchProducts };