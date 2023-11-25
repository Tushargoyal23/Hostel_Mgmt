const mongoose = require('mongoose');
const { Schema } = mongoose;

// creating a schema 
const Items = new Schema({
    name:{
        type:String,
        required:true
    },category:{
        type:String,
        required:true
    },hostel:{
        type:String,
        required:true
    },price:{
        type:Number,
        required:true
    },date:{
        type: Date,
        default: Date.now      
    },hostel:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('item' , Items)