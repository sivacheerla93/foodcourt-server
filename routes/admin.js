var express = require('express');
var router = express.Router();
var foodcourtApi = require('../data/FoodcourtsApi');

// Get all foodcourts
router.get('/foodcourts', function (req, res, next) {
    foodcourtApi.getAllFoodcourts(req, res, next);
});

// Get foodcourt by ID route
router.get('/foodcourts/:id', function (req, res, next) {
    foodcourtApi.getFoodcourt(req, res, next);
});

// Register foodcourt route
router.post('/foodcourts', function (req, res, next) {
    foodcourtApi.registerNewFoodcourt(req, res, next);
});

// Update foodcourt route
router.put('/foodcourts/:id', function (req, res, next) {
    foodcourtApi.updateFoodcourt(req, res, next);
});

//Delete foodcourt route
router.delete('/foodcourts/:id', function (req, res, next) {
    foodcourtApi.deleteFoodcourt(req, res, next);
});

module.exports = router;
