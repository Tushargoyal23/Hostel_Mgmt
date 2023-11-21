const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  meals: {
    breakfast: [{
      type: String,
      required: true
    }],
    lunch: [{
      type: String,
      required: true
    }],
    dinner: [{
      type: String,
      required: true
    }],
    evening: [{
      type: String,
      required: true
    }]
  },
  hostel:{
    type: String,
     required: true,
    enum: ['Tandon', 'Malviya', 'Tilak']
  }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
