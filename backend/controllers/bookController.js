const Book = require('../models/book');

exports.book_list = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.book_detail = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.json(book);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.book_create_get = (req, res) => {
  res.json({ message: "Not implemented yet" });
};

exports.book_create_post = async (req, res) => {
  try {
    const bookData = req.body;
    const book = new Book(bookData);
    const savedBook = await book.save();
    
    res.json(savedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.book_update_get = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.json(book);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.book_update_post = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
    } else {
      book.title = req.body.title;
      book.author = req.body.author;
      book.description = req.body.description;
      book.price = req.body.price;
      book.image = req.body.image;

      const savedBook = await book.save();
      res.json(savedBook);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.book_delete_get = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.json(book);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.book_delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.json(deletedBook);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
