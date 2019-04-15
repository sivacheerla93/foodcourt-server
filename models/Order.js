const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    id: Number,
    foodcourt_id: Number,
    description: {
        item: {
            type: String,
            trim: true,
            required: true
        },
        quantity: {
            type: String,
            trim: true,
            required: true
        }
    },
    delivery: {
        name: {
            type: String,
            trim: true,
            required: true
        },
        mobile: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true
        },
        locality: {
            type: String,
            trim: true,
            required: true
        },
        city: {
            type: String,
            trim: true,
            required: true
        }
    }
});

var Orders = mongoose.model('Orders', OrderSchema, 'manage_orders');
module.exports = Orders;
