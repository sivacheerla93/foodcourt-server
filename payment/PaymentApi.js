const keyPublishable = 'pk_test_UeGmv7AK885iwUBiwWeONr1f00mM1T2KnD';
const keySecret = 'sk_test_IJjZtpe8PIj8vqt7MOWM09Lg00lx0EpQpZ';
const stripe = require("stripe")(keySecret);
var Orders = require('../models/Order');
var Mail = require('../mail/MailApi');

module.exports = {
    callPaymentPage: function (req, res) {
        Orders.findOne({ id: req.params.oid }, function (err, response) {
            if (err) {
                console.log(err);
            } else {
                res.render("index", {
                    keyPublishable: keyPublishable, oid: response.id,
                    fname: 'Pay to ' + response.fname,
                    amount: response.amount * 100
                });
            }
        });
    },

    chargeCustomer: function (req, res) {
        Orders.findOne({ id: req.params.oid }, function (err, response) {
            if (err) {
                console.log(err);
            } else {
                let amount = response.amount * 100;
                let description = 'Pay to ' + response.fname;
                stripe.customers.create({
                    email: req.body.stripeEmail,
                    source: req.body.stripeToken
                }).then(customer =>
                    stripe.charges.create({
                        amount,
                        description: description,
                        currency: "usd",
                        customer: customer.id
                    })).then(
                        charge => {
                            var waitingTime = Math.floor(Math.random() * (30 - 20)) + 20;
                            var subject = 'Your order is successful: ' + response.id;
                            var body = '<h4>Hello ' + response.delivery.name + '!' + '</h4><p>Thank you for making an order with '
                                + response.fname + '!</p>' +
                                '<p>Your order will be delivered in ' + waitingTime + ' Minutes.</p>' +
                                '<p><u>Find your order details below.</u></p>' +
                                '<table>' + response.description + '</table>' +
                                '<p><u>Delivery address:</u></p>' +
                                '<div>' + response.delivery.name + '<br />' +
                                response.delivery.mobile + '<br />' +
                                response.delivery.email + '<br />' +
                                response.delivery.locality + '<br />' +
                                response.delivery.city + '</div>' +
                                '<p><u>Payment details:</u></p>' +
                                '<div>Transaction ID: ' + charge.id + '<br />' +
                                'Transaction amount: ' + response.amount + '/-' + '<br />' +
                                'Transaction status: ' + charge.status + '<br />' +
                                'Paid through: ' + charge.payment_method_details.card.description + '<br />' +
                                'Billing details: ' + charge.billing_details.name + '<br />' +
                                'Download receipt: ' + charge.receipt_url + '</div>';
                            Mail.sendMail(response.delivery.email, subject, body);
                            res.redirect('/');
                        }
                    );
            }
        });
    }
}