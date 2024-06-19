const express = require('express');
const router = express.Router();
const {beMerchant} = require('../controllers/merchant.controller');

const { authenticateJWT } = require('../middlewares/verifyUser');

router.post('/beMerchant', authenticateJWT, beMerchant);

module.exports = router;