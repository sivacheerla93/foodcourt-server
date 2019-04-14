var express = require('express');
var router = express.Router();
var foodcourtApi = require('../data/Foodcourts');

router.get('/', function (req, res, next) {
    foodcourtApi.getAllFoodcourts(req, res, next);
});

router.post('/', function (req, res, next) {
    foodcourtApi.registerNewFoodcourt(req, res, next);
});

module.exports = router;
