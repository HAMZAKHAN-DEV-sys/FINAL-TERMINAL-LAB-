const mongoose = require('mongoose');
const Author = require('.models/author');
const Book = require('.models/book');
const Borrower = require('.models/borrower');

// Connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/libraryDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

// Data to populate
const authorsData = [
  { name: 'Author One', bio: 'Bio of Author One' },
  { name: 'Author Two', bio: 'Bio of Author Two' },
  { name: 'Author Three', bio: 'Bio of Author Three' },
];

const booksData = [
  { title: 'Book One', author: null, isbn: '12345', availableCopies: 5 },
  { title: 'Book Two', author: null, isbn: '67890', availableCopies: 3 },
  { title: 'Book Three', author: null, isbn: '11223', availableCopies: 10 },
];

const borrowersData = [
  { name: 'Borrower One', membershipType: 'Standard', overdueBooks: [] },
  { name: 'Borrower Two', membershipType: 'Premium', overdueBooks: [] },
  { name: 'Borrower Three', membershipType: 'Standard', overdueBooks: [] },
];

// Populate the database
const populateDatabase = async () => {
  try {
    // Clear existing data
    await Author.deleteMany();
    await Book.deleteMany();
    await Borrower.deleteMany();

    // Insert authors
    const authors = await Author.insertMany(authorsData);

    // Link authors to books
    booksData[0].author = authors[0]._id;
    booksData[1].author = authors[1]._id;
    booksData[2].author = authors[2]._id;

    // Insert books
    await Book.insertMany(booksData);

    // Insert borrowers
    await Borrower.insertMany(borrowersData);

    console.log('Database populated successfully!');
  } catch (error) {
    console.error('Error populating the database:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

// Run the script
const run = async () => {
  await connectDB();
  await populateDatabase();
};

run();
