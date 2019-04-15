var mongoose = require('../models/Mongoose');
var Foodcourts = require('../models/Foodcourt');
var bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;
var fs = require('fs');
var imgPath = '/Users/Siva Cheerla/Downloads/img1.jpg';

// establishing connection
mongoose.on('error', function (err) {
    console.log('Connection error', err);
});
mongoose.once('open', function () {
    console.log('Connected to DB.');
});

module.exports = {

    // Get all foodcourts
    getAllFoodcourts: function (req, res, next) {
        Foodcourts.find({}, function (err, response) {
            if (err) {
                console.log(err);
            } else {
                console.log("Getting all foodcourts...");
                // getting image
                // res.contentType(response[0].img.contentType);
                // res.send(response[0].img.data);

                // res.send(response[0].id + " " + response[0].name + " " + response[0].gst + " " +
                //     response[0].validity + " " + response[0].contact.email + " " +
                //     response[0].contact.mobile + " " + response[0].password + " " +
                //     response[0].address.locality + " " + response[0].address.city);
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
                console.log("Getting foodcourt by ID...");
                // getting image
                // res.contentType(response[0].img.contentType);
                // res.send(response[0].img.data);

                // res.send(response[0].id + " " + response[0].name + " " + response[0].gst + " " +
                //     response[0].validity + " " + response[0].contact.email + " " +
                //     response[0].contact.mobile + " " + response[0].password + " " +
                //     response[0].address.locality + " " + response[0].address.city);
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
                console.log("Finding max id...");
                if (response.length == 0) {
                    maxId = Number(1100);
                } else {
                    maxId = Number(response[0].id) + 1;
                }

                bcrypt.hash('Mypwd@123', BCRYPT_SALT_ROUNDS).then(function (hashedPassword) {
                    return new Foodcourts({
                        id: maxId,
                        name: 'KFC Chennai',
                        gst: 'GSTAP12345668',
                        validity: '14th April, 2020',
                        contact: {
                            email: 'kfc.chennai@foodcourt.in',
                            mobile: '1234567890'
                        },
                        password: hashedPassword,
                        address: {
                            locality: 'T. Nagar',
                            city: 'Chennai'
                        },
                        img: {
                            data: fs.readFileSync(imgPath),
                            contentType: 'image/jpg'
                        }
                    });
                }).then(function (newFoodcourt) {
                    newFoodcourt.save(function (err, response) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Creating Foodcourt...');
                            res.json(response.id);
                        }
                    });
                });
            }
        });
    },

    // Updating foodcourt by ID
    updateFoodcourt: function (req, res, next) {
        bcrypt.hash('Mypwd@123', BCRYPT_SALT_ROUNDS).then(function (hashedPassword) {
            Foodcourts.findOneAndUpdate({
                id: req.params.id
            }, {
                    $set: {
                        name: 'KFC T. Nagar',
                        gst: 'GSTAP12345668',
                        validity: '14th April, 2020',
                        contact: {
                            email: 'kfc.chennai@foodcourt.in',
                            mobile: '1234567890'
                        },
                        password: hashedPassword,
                        address: {
                            locality: 'T. Nagar',
                            city: 'Chennai'
                        },
                        img: {
                            data: fs.readFileSync(imgPath),
                            contentType: 'image/jpg'
                        }
                    }
                }, function (err, response) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('Updating foodcourt by ID...');
                        res.json(response.id);
                    }
                });
        });
    },

    // Deleting an existing foodcourt
    deleteFoodcourt: function (req, res, next) {
        Foodcourts.findOneAndDelete({
            id: Number(req.params.id)
        }, function (err, response) {
            if (err)
                return console.log(err);
            else {
                console.log('Deleting Foodcourt by ID...');
                res.json(response.id);
            }
        });
    }
}