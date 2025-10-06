// Import the connection module and the Book model
const mongoose = require('mongoose'); // Import mongoose
const { connectDB, Book } = require('./insert_books'); // Import connection and model

// Main function to perform CRUD operations
const main = async () => {
  try {
    // Connect to the MongoDB server
    await connectDB();

    // Example: Inserting multiple new books
    const books = [
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
        published_year: 1960,
        price: 12.99,
        in_stock: true,
        pages: 336,
        publisher: 'J. B. Lippincott & Co.'
      },
      {
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
        published_year: 1949,
        price: 10.99,
        in_stock: true,
        pages: 328,
        publisher: 'Secker & Warburg'
      },
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Fiction',
        published_year: 1925,
        price: 9.99,
        in_stock: true,
        pages: 180,
        publisher: 'Charles Scribner\'s Sons'
      },
      {
        title: 'Brave New World',
        author: 'Aldous Huxley',
        genre: 'Dystopian',
        published_year: 1932,
        price: 11.50,
        in_stock: false,
        pages: 311,
        publisher: 'Chatto & Windus'
      },
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        published_year: 1937,
        price: 14.99,
        in_stock: true,
        pages: 310,
        publisher: 'George Allen & Unwin'
      },
      {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        genre: 'Fiction',
        published_year: 1951,
        price: 8.99,
        in_stock: true,
        pages: 224,
        publisher: 'Little, Brown and Company'
      },
      {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        genre: 'Romance',
        published_year: 1813,
        price: 7.99,
        in_stock: true,
        pages: 432,
        publisher: 'T. Egerton, Whitehall'
      },
      {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        published_year: 1954,
        price: 19.99,
        in_stock: true,
        pages: 1178,
        publisher: 'Allen & Unwin'
      },
      {
        title: 'Animal Farm',
        author: 'George Orwell',
        genre: 'Political Satire',
        published_year: 1945,
        price: 8.50,
        in_stock: false,
        pages: 112,
        publisher: 'Secker & Warburg'
      },
      {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        genre: 'Fiction',
        published_year: 1988,
        price: 10.99,
        in_stock: true,
        pages: 197,
        publisher: 'HarperOne'
      },
      {
        title: 'Moby Dick',
        author: 'Herman Melville',
        genre: 'Adventure',
        published_year: 1851,
        price: 12.50,
        in_stock: false,
        pages: 635,
        publisher: 'Harper & Brothers'
      },
      {
        title: 'Wuthering Heights',
        author: 'Emily Brontë',
        genre: 'Gothic Fiction',
        published_year: 1847,
        price: 9.99,
        in_stock: true,
        pages: 342,
        publisher: 'Thomas Cautley Newby'
      }
    ];

    for (const bookData of books) {
      const newBook = new Book(bookData);
      await newBook.save(); // Save the book to the database
      console.log("New book added:", newBook);
    }


    // Basic CRUD Operations
    // Find all books
    const allBooks = await Book.find();
    console.log("All Books:", allBooks);

    // Find books by a specific author
    const authorBooks = await Book.find({ author: "Herman Melville" });
    console.log("Books by Herman Melville:", authorBooks);

    // Find books published after 1950
    const recentBooks = await Book.find({ published_year: { $gt: 1950 } });
    console.log("Books published after 1950:", recentBooks);

    // Find books in a specific genre
    const specificGenreBooks = await Book.find({ genre: "Gothic Fiction" });
    console.log("Fiction Books:", specificGenreBooks);

    // TASK 3: ADVANCED QUERIES
    // Find in-stock books
    const inStockBooks = await Book.find({ in_stock: true });
    console.log("In-stock Books:", inStockBooks);

    // Return only the title, author, and price fields
    const projectedBooks = await Book.find({}, { title: 1, author: 1, price: 1, _id: 0 });
    console.log("Projected Books (title, author, price):", projectedBooks);

    // Sorting books by price in ascending order
    const sortedBooksAsc = await Book.find().sort({ price: 1 });
    console.log("Books sorted by price (ascending):", sortedBooksAsc);

    // Sorting books by price in descending order
    const sortedBooksDesc = await Book.find().sort({ price: -1 });
    console.log("Books sorted by price (descending):", sortedBooksDesc);

    // Pagination: 5 books per page, page 1
    const page = 1;
    const limit = 5;
    const paginatedBooks = await Book.find().skip((page - 1) * limit).limit(limit);
    console.log(`Books on page ${page}:`, paginatedBooks);

    // TASK 4: AGGREGATION PIPELINE
    // Total number of books in the collection
    const totalBooks = await Book.countDocuments();
    console.log("Total number of books:", totalBooks);

    // Average price of books
    const avgPrice = await Book.aggregate([
      { $group: { _id: null, averagePrice: { $avg: "$price" } } }
    ]);
    console.log("Average price of books:", avgPrice[0]?.averagePrice || 0);

    // Number of books by genre
    const booksByGenre = await Book.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } }
    ]);
    console.log("Number of books by genre:", booksByGenre);

    // TASK 5: INDEXING
    // Create an index on the title field for faster searches
    await Book.init();
    await Book.createIndexes({ title: 1 });
    console.log("Index created on title field");

    // Create a compound index on author and published_year
    await Book.init(); // Ensure the model is initialized before creating indexes
    await Book.createIndexes({ author: 1, published_year: -1 });
    console.log("Compound index created on author and published_year");

    // Use the explain() method to demonstrate the performance improvement with your indexes
    const explainResult = await Book.find({ title: "1984" }).explain("executionStats");
    console.log("Explain result for title search:", explainResult);

  } catch (error) {
    console.error("Error performing CRUD operations:", error);
  } finally {
    await mongoose.connection.close(); // Close the connection
    console.log("Connection closed");
  }
}

// Execute the CRUD operations
main().catch(console.dir);