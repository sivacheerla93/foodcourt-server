const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodcourtSchema = new Schema({
    id: Number,
    name: String,
    gst: String,
    validity: String,
    contact: {
        email: String,
        mobile: String
    },
    password: String,
    address: {
        locality: String,
        city: String
    },
    img: {
        data: Buffer,
        contentType: String
    }
});

var Foodcourts = mongoose.model('Foodcourts', FoodcourtSchema, 'manage_foodcourts');
module.exports = Foodcourts;
