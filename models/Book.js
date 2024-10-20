const db = require("../config/db");

class Book {
  static getAll(callback) {
    const query = "SELECT * FROM books";
    db.query(query, callback);
  }

  static getByCategory(category, callback) {
    const query = "SELECT * FROM books WHERE category = ?";
    db.query(query, [category], callback);
  }

  static add(book, callback) {
    const query =
      "INSERT INTO books (title, author, category, publicationYear, pdf_path) VALUES (?, ?, ?, ?, ?)";
    const params = [
      book.title,
      book.author,
      book.category,
      book.publicationYear,
      book.pdfPath,
    ];
    db.query(query, params, callback);
  }
}

module.exports = Book;
