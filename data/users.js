const userModel = require('../models/Consumer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    create: function (req, res, next) {
        userModel.findOne({ email: req.body.email })
            .exec(function (err, user) {
                if (err) {
                    console.log(err);
                } else if (!user) {
                    userModel.create({
                        name: req.body.name, email: req.body.email, password: req.body.password
                        , mobile: req.body.mobile
                        , gender: req.body.gender, address: req.body.address,
                        city: req.body.city
                    }, function (err, result) {
                        if (err) {
                            res.json({ status: "error" });
                            console.log(err);
                            next(err);
                        }
                        else {
                            res.json({ status: "success" });
                        }
                    });
                }
                else {
                    res.json({ status: "User already exists" });
                }
            });
    },

    getUser: function (req, res, next) {
        userModel.find({ _id: req.body.id }, function (err, response) {
            if (err) {
                console.log(err);
            } else {
                res.json({ status: "success", userinfo: response });
            }
        });
    },

    authenticate: function (req, res, next) {
        userModel.findOne({ email: req.body.fId }, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                if (userInfo != null && bcrypt.compareSync(req.body.pwd, userInfo.password)) {
                    const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.json({ status: "success", message: "user found!!!", token: token });
                } else {
                    res.json({ status: req.body.fId + req.body.pwd, message: "Invalid email/password!!!", data: null });
                }
            }
        });
    },
}