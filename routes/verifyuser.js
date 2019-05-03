var express = require('express');
var router = express.Router();
var Users = require('../data/users');

router.post('/verify', function (req, res, next) {
    if (req.body.id == null) {
    }
    else {
        Users.getUser(req, res, next);
    }
});


module.exports = router;