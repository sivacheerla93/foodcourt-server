var Orders = require('../models/Order');
module.exports = {

    // Get all orders based on foodcourt id, ex: foodcourt 1100
    getAllOrders: function (req, res, next) {
        Orders.find({ foodcourt_id: req.params.id }, function (err, response) {
            if (err) {
                console.log(err);
            } else {
                console.log("Getting all orders...");
                console.log(response);
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
                    fname: req.body.fname,
                    description: req.body.description,
                    amount: req.body.amount
                });

                newOrder.save(function (err, response) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Creating new order...');
                        //res.json(response.id);
                        res.json({ status: "success", idval: response.id });
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
            });
    },
}
