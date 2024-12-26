const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    membership: { type: String, enum: ['Basic', 'Premium'], required: true },
    borrowedBooks: [{
        book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        borrowDate: { type: Date, default: Date.now },
        dueDate: { type: Date }
    }]
});

module.exports = mongoose.model('Borrower', borrowerSchema);
