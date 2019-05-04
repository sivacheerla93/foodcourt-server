var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/foodcourt');
//mongoose.connect('mongodb://foodcourt:Test123@ds151486.mlab.com:51486/heroku_6sv5fjtm');
var db = mongoose.connection;

module.exports = db;