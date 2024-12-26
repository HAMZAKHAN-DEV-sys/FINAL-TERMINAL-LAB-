const Book = require('../models/book');
const Author = require('../models/author');

exports.createBook = async (req, res, next) => {
    try {
        const { title, author, isbn, available } = req.body;

        // Check if the author has more than 5 books
        const authorData = await Author.findById(author).populate('books');
        if (authorData.books.length >= 5) {
            return res.status(400).json({ message: 'Author cannot be linked to more than 5 books' });
        }

        const book = new Book({ title, author, isbn, availableCopies });
        const savedBook = await book.save();

        authorData.books.push(savedBook._id);
        await authorData.save();

        res.status(201).json(book);
    } catch (err) {
        next(err);
    }
};
