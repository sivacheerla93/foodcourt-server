const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    id: Number,
    foodcourt_id: Number,
    name: String,
    price: String,
    availability: String,
    img: String
});

var Item = mongoose.model('Item', ItemSchema, 'manage_items');
module.exports = Item;
