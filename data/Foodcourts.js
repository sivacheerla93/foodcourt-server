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
    getAllFoodcourts: function (req, res, next) {
        //res.send('Inside Get All method');
        Foodcourts.find({ id: 1100 }, function (err, data) {
            if (err) {
                res.send(err);
            } else {
                // getting image
                // res.contentType(data[0].img.contentType);
                // res.send(data[0].img.data);

                res.send(data[0].id + " " + data[0].name + " " + data[0].gst + " " +
                    data[0].validity + " " + data[0].contact.email + " " +
                    data[0].contact.mobile + " " + data[0].password + " " +
                    data[0].address.locality + " " + data[0].address.city);
            }
        })
    },

    registerNewFoodcourt: function (req, res, next) {
        //res.send('Inside Register method');

        Foodcourts.remove({}, function (err, data) {
            if (err)
                console.log(err);
            else {
                console.log(data);
            }
        }).then(function () {
            bcrypt.hash('Mypwd@123', BCRYPT_SALT_ROUNDS).then(function (hashedPassword) {
                return new Foodcourts({
                    id: 1100,
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
                        res.send(err);
                    } else {
                        res.send('Foodcourt created!');
                    }
                });
            });
        });
    }
}