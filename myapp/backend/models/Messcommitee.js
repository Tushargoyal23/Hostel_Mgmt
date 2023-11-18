const mongoose = require('mongoose');

const messCommitee = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  post:{
    type: String,
    required: true,
    enum: ['Manager', 'Sacretary', 'Member']
  },
  hostel:{
    type: String,
    required: true,
    enum: ['Tandon', 'Malviya', 'Tilak']
  }
}, { timestamps: true });

const Messcommitee = mongoose.model('Messcommitee', messCommitee);

module.exports = Messcommitee;
