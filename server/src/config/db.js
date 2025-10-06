import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongoose connected.");
  } catch (error) {
    console.error("Error with connecting to the database", error);
    process.exit(1);
  }
}