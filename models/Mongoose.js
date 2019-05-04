var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/foodcourt');
//mongoose.connect('mongodb://siva:Foodcourt123@ds151066.mlab.com:51066/heroku_xn0071pk');
var db = mongoose.connection;

module.exports = db;