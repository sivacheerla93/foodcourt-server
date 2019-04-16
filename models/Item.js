const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    id: Number,
    foodcourt_id: Number,
    name: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: String,
        trim: true,
        required: true,
    },
    availability: {
        type: String,
        trim: true,
        required: true,
    },
    img: {
        data: Buffer,
        contentType: String
    }
});

var Item = mongoose.model('Item', ItemSchema, 'manage_items');
module.exports = Item;
