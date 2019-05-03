var Foodcourts = require('../models/Foodcourt');
var Orders = require('../models/Order');
var Items = require('../models/Item');
var bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;

module.exports = {

    // Validate vendor
    validateVendor: function (req, res, next) {
        Foodcourts.find({ id: Number(req.body.fId) }, function (err, response) {
            if (err) {
                console.log(err);
            } else {
                if (response.length == 0) {
                    res.json({ status: "not found", fId: req.body.fId });
                } else if (Number(req.body.fId) == response[0].id) {
                    if (bcrypt.compareSync(req.body.pwd, response[0].password)) {
                        res.json({ status: "valid", fId: Number(response[0].id) });
                    } else {
                        res.json({ status: "invalid", fId: Number(response[0].id) });
                    }
                } else {
                    res.json({ status: "some problem" });
                }
            }
        });
    },

    // Get all foodcourts
    getAllFoodcourts: function (req, res, next) {
        Foodcourts.find({}, function (err, response) {
            if (err) {
                console.log(err);
            } else {
                res.json(response);
            }
        })
    },

    // Get foodcourt by ID
    getFoodcourt: function (req, res, next) {
        Foodcourts.find({ id: Number(req.params.id) }, function (err, response) {
            if (err) {
                console.log(err);
            } else {
                res.json(response);
            }
        })
    },

    // Registering new foodcourt
    registerNewFoodcourt: function (req, res, next) {
        Foodcourts.find().sort({
            id: -1
        }).limit(1).exec(function (err, response) {
            if (err) {
                console.log(err);
            } else {
                var maxId;
                if (response.length == 0) {
                    maxId = Number(1100);
                } else {
                    maxId = Number(response[0].id) + 1;
                }

                bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS).then(function (hashedPassword) {
                    return new Foodcourts({
                        id: maxId,
                        name: req.body.name,
                        gst: req.body.gst,
                        validity: req.body.validity,
                        contact: {
                            email: req.body.email,
                            mobile: req.body.mobile
                        },
                        password: hashedPassword,
                        address: {
                            locality: req.body.locality,
                            city: req.body.city
                        },
                        img: req.body.img
                    });
                }).then(function (newFoodcourt) {
                    newFoodcourt.save(function (err, response) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json(response.id);
                        }
                    });
                });
            }
        });
    },

    // Updating foodcourt by ID
    updateFoodcourt: function (req, res, next) {
        bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS).then(function (hashedPassword) {
            Foodcourts.findOneAndUpdate({
                id: req.params.id
            }, {
                    $set: {
                        name: req.body.name,
                        gst: req.body.gst,
                        validity: req.body.validity,
                        contact: {
                            email: req.body.email,
                            mobile: req.body.mobile
                        },
                        password: hashedPassword,
                        address: {
                            locality: req.body.locality,
                            city: req.body.city
                        },
                        img: req.body.img
                    }
                }, function (err, response) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(response.id);
                    }
                });
        });
    },

    // Deleting an existing foodcourt that includes live orders and items
    deleteFoodcourt: function (req, res, next) {
        Orders.deleteMany({ foodcourt_id: req.params.id }, function (err, response) {
            if (err) {
                return console.log(err);
            } else {
            }
        }).then(function () {
            Items.deleteMany({ foodcourt_id: req.params.id }, function (err, response) {
                if (err) {
                    return console.log(err);
                } else {
                }
            }).then(function () {
                Foodcourts.findOneAndDelete({
                    id: Number(req.params.id)
                }, function (err, response) {
                    if (err)
                        return console.log(err);
                    else {
                        res.json(response.id);
                    }
                });
            });
        });
    }
}