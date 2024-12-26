const Author = require('../models/author');
const Book = require('../models/book');

exports.createAuthor = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const author = new Author({ name, email });
        await author.save();
        res.status(201).json(author);
    } catch (err) {
        next(err);
    }
};
