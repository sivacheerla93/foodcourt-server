var express = require('express');
var router = express.Router();
var itemsApi = require('../data/ItemsApi');
var foodcourtsApi = require('../data/FoodcourtsApi');

// Validate vendor route
router.post('/validate', function (req, res, next) {
    foodcourtsApi.validateVendor(req, res, next);
})

// Get all items route for selected foodcourt
router.get('/items/foodcourt/:id', function (req, res, next) {
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
