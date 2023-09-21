const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://alien:3436@cluster0.a3exeoo.mongodb.net/?retryWrites=true&w=majority", {
      // these are added to avoid warnings
      useNewUrlParser: true,
    });

    console.log(`MongoDB connected.......`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
