var express = require('express');
var router = express.Router();
var itemsApi = require('../data/ItemsApi');

// Get all items route
router.get('/items', function (req, res, next) {
    itemsApi.getAllItems(req, res, next);
});

// Get item by ID route
router.get('/items/:id', function (req, res, next) {
    itemsApi.getItem(req, res, next);
});

// Add item route
router.post('/items', function (req, res, next) {
    itemsApi.addNewItem(req, res, next);
});

// Update item route
router.put('/items/:id', function (req, res, next) {
    itemsApi.updateItem(req, res, next);
});

//Delete item route
router.delete('/items/:id', function (req, res, next) {
    itemsApi.deleteItem(req, res, next);
});

module.exports = router; 
