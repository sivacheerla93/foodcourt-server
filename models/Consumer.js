const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConsumerSchema = new Schema({
    id: Number,
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    mobile: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    gender: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    }
});

var Consumer = mongoose.model('Consumer', ConsumerSchema, 'consumer_foodcourt');
module.exports = Consumer;
