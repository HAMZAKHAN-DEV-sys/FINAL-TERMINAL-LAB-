const Borrower = require('../models/borrower');
const Book = require('../models/book');

exports.borrowBook = async (req, res, next) => {
    try {
        const { borrowerId, bookId } = req.body;

        // Check borrower's overdue books
        const borrower = await Borrower.findById(borrowerId);
        const overdueBooks = borrower.borrowedBooks.filter(b => new Date(b.dueDate) < Date.now());
        if (overdueBooks.length > 0) {
            return res.status(400).json({ message: 'Cannot borrow books with overdue loans' });
        }

        // Check book availability
        const book = await Book.findById(bookId);
        if (book.availableCopies <= 0) {
            return res.status(400).json({ message: 'No copies available to borrow' });
        }

        // Borrow the book
        book.availableCopies--;
        borrower.borrowedBooks.push({ book: book._id, dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) });
        await book.save();
        await borrower.save();

        res.status(200).json({ message: 'Book borrowed successfully' });
    } catch (err) {
        next(err);
    }
};
