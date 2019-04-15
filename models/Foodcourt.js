const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodcourtSchema = new Schema({
    id: Number,
    name: {
        type: String,
        trim: true,
        required: true,
    },
    gst: {
        type: String,
        trim: true,
        required: true,
    },
    validity: {
        type: String,
        trim: true,
        required: true,
    },
    contact: {
        email: {
            type: String,
            trim: true,
            required: true
        },
        mobile: {
            type: String,
            trim: true,
            required: true
        }
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
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
