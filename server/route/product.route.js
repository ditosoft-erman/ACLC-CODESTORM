const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const {authenticateJWT, authorizeRole } = require('../middlewares/verifyUser');
const { addProduct, updateProduct, deleteProduct, getProduct} = require('../controllers/products.controller');


router.post('/add' , authenticateJWT, authorizeRole('merchant'),  upload.single('productImage'), addProduct);
router.put('/update/:id' , authenticateJWT, authorizeRole('merchant'),  upload.single('productImage') ,updateProduct);
router.delete('/:id' , authenticateJWT, authorizeRole('merchant'), deleteProduct);
router.get('/getall' , authenticateJWT, authorizeRole('merchant'), getProduct);


module.exports = router;




