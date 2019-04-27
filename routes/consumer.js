var express = require('express');
var router = express.Router();
var ordersApi = require('../data/OrdersApi');

// Get all orders route for selected foodcourt
router.get('/orders/:id', function (req, res, next) {
    ordersApi.getAllOrders(req, res, next);
});

// Create new order route
router.post('/orders', function (req, res, next) {
    ordersApi.createNewOrder(req, res, next);
});

// Update item route
router.put('/orders/:id', function (req, res, next) {
    ordersApi.updateOrder(req, res, next);
});

module.exports = router; 
