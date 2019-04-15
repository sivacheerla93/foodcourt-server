const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    id: Number,
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
});

var Admin = mongoose.model('Admin', AdminSchema, 'admin_foodcourt');
module.exports = Admin;
