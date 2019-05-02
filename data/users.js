const userModel = require('../models/Consumer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports = {

    create: function (req, res, next) {


        var newOrder = new userModel({

            name: req.body.name, email: req.body.email, password: req.body.password
            , mobile: req.body.mobile
            , gender: req.body.gender, address: req.body.address,
            city: req.body.city
        });

        newOrder.save(function (err, response) {
            if (err) {
                console.log(err);
            } else {
                console.log('Creating new order...');
                res.json(response.id);
            }
        });
    },


    /*create: function(req, res, next) {
	
  userModel.findOne({ email: req.body.email })
  .exec(function (err, user) {
    if (err) {
      res.json({status: "error user exists"});
    } else if (!user) {
       userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password
       ,mobile: req.body.mobile
          ,gender: req.body.gender,	address:req.body.address,
              city: req.body.city			}, function (err, result) {
          	
                  if (err) 
                  {
                  res.json({status: "error"});
                  console.log(err);
                      next(err);
                  }
                  else
                  {
                      //res.json({status: "success", message: "User added successfully!!!", data: null});
                      console.log("added user success");
                  }
              });
          	
          console.log("added user");
	
   }
   else if(user)
   {
      res.json({message: "User already exists!!"});
   
   }
   
    });
  },*/

    getUser: function (req, res, next) {
        userModel.find({ _id: req.body.id }, function (err, response) {
            if (err) {
                console.log(req.body.id);
                console.log('error user')
                console.log(err);
            } else {
                console.log(req.body.id);
                console.log("Getting userdetails by ID...");
                res.json({ status: "success", userinfo: response });
                console.log('hello');
                console.log({ status: "success", userinfo: response });
                console.log(' user')
            }
        })
    },



    authenticate: function (req, res, next) {
        userModel.findOne({ email: req.body.fId }, function (err, userInfo) {
            if (err) {
                next(err);
            } else {

                if (userInfo != null && bcrypt.compareSync(req.body.pwd, userInfo.password)) {

                    const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });

                    res.json({ status: "success", message: "user found!!!", token: token });
                    //data:{user: userInfo,
                } else {

                    res.json({ status: req.body.fId + req.body.pwd, message: "Invalid email/password!!!", data: null });

                }
            }
        });
    },

}