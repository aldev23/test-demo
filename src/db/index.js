import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Read the MongoDB connection string from the environment
const MONGODB_URI = process.env.MONGODB_URI;

// Create a MongoClient instance
const client = new MongoClient(MONGODB_URI);

// Define the connectDB function as an async function
const connectDB = async () => {
    try {
        // Connect to the MongoDB Atlas cluster
        await client.connect();
        console.log("Successfully connected to Atlas");
    } catch (err) {
        console.log(err.stack);
    } finally {
        // Close the MongoDB connection
        await client.close();
    }
};

// Run the async function and handle any errors
export default connectDB;
