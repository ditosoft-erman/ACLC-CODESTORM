const express = require('express');
const router = express.Router();
const { createOrder, getOrder } = require('../controllers/order.controller');
const { authenticateJWT } = require('../middlewares/verifyUser');


router.post('/buy', authenticateJWT, createOrder);
router.get('/getbuy', authenticateJWT, getOrder);

module.exports = router;