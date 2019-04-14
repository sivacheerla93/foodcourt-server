var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/foodcourt');
var db = mongoose.connection;

// db.on('error', function (err) {
//     console.log('Connection error', err);
// });
// db.once('open', function () {
//     console.log('Connected to DB.');
// });

module.exports = db;