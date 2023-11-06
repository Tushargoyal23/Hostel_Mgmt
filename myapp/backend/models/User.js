const mongoose = require('mongoose');

const { Schema } = mongoose; // Use 'Schema' with an uppercase 'S'

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    hostel: {
        type: String,
        required: true
    },
    registration_no: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', userSchema);
