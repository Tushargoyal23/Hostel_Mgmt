const mongoose = require('mongoose');
const { Schema } = mongoose;

// creating a schema 
const ComplainSchema = new Schema({
    name : {
        type: String,
        required:true
    },email:{
        type: String,
        required: true
    },title :{
        type: String,
        required: true
    },date:{
        type: Date,
        default: Date.now
    }, description:{
        type: String,
        required:true
    },image: {
        data: Buffer, // Use Buffer to store binary data
        contentType: String,
    }
});

module.exports = mongoose.model('complain' , ComplainSchema)