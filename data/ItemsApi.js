var Items = require('../models/Item');
var fs = require('fs');
var imgPath = '/Users/Siva Cheerla/Downloads/img4.jpg';

module.exports = {

    // Get all items based on foodcourt id, ex: foodcourt 1100
    getAllItems: function (req, res, next) {
        Items.find({ foodcourt_id: req.params.id }, function (err, response) {
            if (err) {
                console.log(err);
            } else {
                console.log("Getting all items...");
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

    // Get single item by ID
    getItem: function (req, res, next) {
        Items.find({ id: req.params.id }, function (err, response) {
            if (err) {
                console.log(err);
            } else {
                console.log("Getting item by ID...");
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

    // Adding new item to the current foodcourt, ex: foodcourt 1100
    addNewItem: function (req, res, next) {
        Items.find({ foodcourt_id: 1100 }).sort({
            id: -1
        }).limit(1).exec(function (err, response) {
            if (err) {
                console.log(err);
            } else {
                var maxId;
                console.log("Finding max id...");
                if (response.length == 0) {
                    maxId = Number(1100 + "1");
                } else {
                    maxId = Number(response[0].id) + 1;
                }

                var newItem = new Items({
                    id: maxId,
                    foodcourt_id: 1100,
                    name: req.body.name,
                    price: req.body.price,
                    availability: req.body.availability,
                    img: {
                        data: fs.readFileSync(imgPath),
                        contentType: 'image/jpg'
                    }
                });

                newItem.save(function (err, response) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Adding new item...');
                        res.json(response.id);
                    }
                });
            }
        });
    },

    // Updating item by ID
    updateItem: function (req, res, next) {
        Items.findOneAndUpdate({
            id: req.params.id
        }, {
                $set: {
                    name: req.body.name,
                    price: req.body.price,
                    availability: req.body.availability,
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
                    console.log('Updating item by ID...');
                    res.json(response.id);
                }
            });
    },

    // Deleting an existing item
    deleteItem: function (req, res, next) {
        Items.findOneAndDelete({
            id: req.params.id
        }, function (err, response) {
            if (err)
                return console.log(err);
            else {
                console.log('Deleting item by ID...');
                res.json(response.id);
            }
        });
    }
}
