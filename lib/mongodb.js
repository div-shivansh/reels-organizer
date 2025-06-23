import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "reelOrganizer",
      useNewUrlParser: true,
    });
    console.log("connected")
  } catch (error) {
    console.error(error.message);
    process.exit(1)
  }
}

export default connectDB;