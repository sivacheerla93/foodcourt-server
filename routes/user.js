var express = require('express');
var router = express.Router();
var Users = require('../data/UsersApi');

router.post('/authenticate', function (req, res, next) {
    Users.authenticate(req, res, next);
});
router.post('/register', function (req, res, next) {
    Users.create(req, res, next);
});

module.exports = router;