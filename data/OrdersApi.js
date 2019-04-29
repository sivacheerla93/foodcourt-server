var Orders = require('../models/Order');
var Mail = require('../mail/MailApi');

module.exports = {

    // Get all orders based on foodcourt id, ex: foodcourt 1100
    getAllOrders: function (req, res, next) {
        Orders.find({ foodcourt_id: req.params.id }, function (err, response) {
            if (err) {
                console.log(err);
            } else {
                console.log("Getting all orders...");
                res.json(response);
            }
        });
    },

    // Creating new order to the current foodcourt, ex: foodcourt 1100
    createNewOrder: function (req, res, next) {
        Orders.find({ foodcourt_id: req.body.foodcourt_id }).sort({
            id: -1
        }).limit(1).exec(function (err, response) {
            if (err) {
                console.log(err);
            } else {
                var maxId;
                console.log("Finding max id...");
                if (response.length == 0) {
                    maxId = Number(req.body.foodcourt_id + "100");
                } else {
                    maxId = Number(response[0].id) + 1;
                }

                var newOrder = new Orders({
                    id: maxId,
                    foodcourt_id: Number(req.body.foodcourt_id),
                    description: req.body.description
                });

                newOrder.save(function (err, response) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Creating new order...');
                        res.json(response.id);
                    }
                });
            }
        });
    },

    // Updating (or) finalizing order by ID
    updateOrder: function (req, res, next) {
        Orders.findOneAndUpdate({
            id: Number(req.params.id)
        }, {
                $set: {
                    delivery: {
                        name: req.body.name,
                        mobile: req.body.mobile,
                        email: req.body.email,
                        locality: req.body.locality,
                        city: req.body.city
                    }
                }
            }, function (err, response) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Finalizing order by ID...');
                    res.json(response.id);
                }
            }).then(function () {
                Orders.findOne({ id: req.params.id }, function (err, response) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Getting order details to send mail!');
                    }
                }).then(function (response) {
                    var subject = 'Your order is successful!: ' + response.id;
                    var body = '<h4>Hello ' + response.delivery.name + '!' + '</h4><p>Thank you for making an order with '
                        + response.foodcourt_id + '</p>' +
                        '<p><u>Find your order details below.</u></p>' +
                        '<table>' + response.description + '</table>' +
                        '<p><u>Delivery address:</u></p>' +
                        '<div>' + response.delivery.name + '<br />' +
                        response.delivery.mobile + '<br />' +
                        response.delivery.email + '<br />' +
                        response.delivery.locality + '<br />' +
                        response.delivery.city + '</div>';
                    Mail.sendMail(req.body.email, subject, body);
                });
            });
    },
}
