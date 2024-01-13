import { MongoClient } from "mongodb";

// Replace the following with your Atlas connection string
const url = "mongodb+srv://chaiaurcode:chaiaurcode@cluster0.ol4bhek.mongodb.net/";

// Create a MongoClient instance
const client = new MongoClient(url);

// Define the run function as an async function
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
}

// Run the async function and handle any errors
export default connectDB
