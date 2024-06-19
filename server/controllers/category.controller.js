const { ProductCategory } = require('../models');

const createCategory = async (req, res) => {
    const { name, desc } = req.body;

    try {
        const newCategory = await ProductCategory.create({ name, desc });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Unable to create category' });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await ProductCategory.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Unable to fetch categories' });
    }
};

const getCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await ProductCategory.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Unable to fetch category' });
    }
};


const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, desc } = req.body;

    try {
        const category = await ProductCategory.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        
        category.name = name || category.name;
        category.desc = desc || category.desc;
        await category.save();

        res.status(200).json(category);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Unable to update category' });
    }
};


const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await ProductCategory.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        await category.destroy();
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Unable to delete category' });
    }
};

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};
