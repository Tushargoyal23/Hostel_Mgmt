const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://Tushar:Tushar@cluster0.anjje3w.mongodb.net/HMP?retryWrites=true&w=majority';

const MongoDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
    const fetched_data = await mongoose.connection.db.collection("users").find({}).toArray();
    const Complain_data = await mongoose.connection.db.collection("complains").find({}).toArray();
    const Menu_data = await mongoose.connection.db.collection("menu").find({}).toArray();
    // console.log(Complain_data);
    // console.log(Menu_data);
    global.userData = fetched_data;
    global.ComplainData = Complain_data;
    global.MenuData = Menu_data;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

module.exports = MongoDB;
