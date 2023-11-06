const mongoose = require('mongoose');
// const MongoUrl = 'mongodb+srv://Tushar:Tushar@23@cluster0.anjje3w.mongodb.net/mydatabase?retryWrites=true&w=majority';
const MongoUrl = 'mongodb+srv://Tushar:Tushar@cluster0.anjje3w.mongodb.net/HMP?retryWrites=true&w=majority';

const connectToMongoDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(MongoUrl);
    console.log("Connected to Mongo Successfully!");
    mongoose.connection.once('open', async () => {
      try {
        const fetched_data = await mongoose.connection.db.collection("users").find({}).toArray();
        global.userDetails = fetched_data;
        console.log(global.userDetails)
      } catch (error) {
        console.log(error);
        process.exit();
      }
    });
    
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

module.exports = connectToMongoDB;
