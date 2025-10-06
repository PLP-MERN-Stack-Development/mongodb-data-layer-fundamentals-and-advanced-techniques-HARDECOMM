// books schema Vs connection setup

const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Define the Book schema
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    published_year: { type: Number, required: true },
    price: { type: Number, required: true },
    in_stock: { type: Boolean, required: true },
    pages: { type: Number, required: true },
    publisher: { type: String, required: true }
}, { timestamps: true });

// Create the Book model
const Book = mongoose.model('Book', bookSchema);

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI); // No deprecated options
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        throw error; // Rethrow the error for handling in the caller
    }
};

// Export both the connection function and the Book model
module.exports = { connectDB, Book };