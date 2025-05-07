import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI ?? "", {
            dbName: "My_Library",

        });
        console.log("Connected to database successfully");
    } catch (e) {
        console.log(`Error connecting to database:   ${e}`);
    }
}

export default connectToDatabase;