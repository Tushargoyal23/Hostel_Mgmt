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
  
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type :Boolean,
        default:false,
    },
    email:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('user', userSchema);
