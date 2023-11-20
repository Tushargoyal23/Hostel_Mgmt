const mongoose = require('mongoose');

const messMember = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  post:{
    type: String,
    required: true,
    enum: ['Worker Head', 'Worker', 'Grocery Manager', 'Chef']
  },
  hostel:{
    type: String,
    required: true,
    enum: ['Tandon', 'Malviya', 'Tilak']
  }
}, { timestamps: true });

const Messmember = mongoose.model('Messmember', messMember);

module.exports = Messmember;
