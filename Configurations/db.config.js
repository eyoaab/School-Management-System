const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ mongoDB connectd");
  } catch (error) {
    console.log("`❌ error connecting to MongoDB : ", error);
    process.exit(1);
  }
};

module.exports = connectDB;