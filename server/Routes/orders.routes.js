const express = require('express');
const router = express.Router();
const { placeorder, getorders, getorder } = require('../Controllers/orders.controllers');

router.post('/placeorder',placeorder);
router.get('/getorders',getorders);
router.get('/getorder/:id',getorder);   

module.exports = router;