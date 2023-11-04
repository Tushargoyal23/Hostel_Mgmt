const mongoose = require('mongoose');
const MongoUri = 'mongodb+srv://Tushar:Tushar@23@cluster0.anjje3w.mongodb.net/mydatabase?retryWrites=true&w=majority';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

module.exports = connectToMongoDB;
