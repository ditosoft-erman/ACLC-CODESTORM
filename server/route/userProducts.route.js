const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/verifyUser');
const { getProducts, searchProducts } = require('../controllers/userProducts.controller');

router.get('/allproducts', authenticateJWT, getProducts);
router.get('/searchProducts', authenticateJWT, searchProducts); 
module.exports = router;