const db = require("../config/db"); // Import the database connection configuration

class Book {
  // Static method to retrieve all books from the database
  static getAll(callback) {
    const query = "SELECT * FROM books"; // SQL query to select all books
    db.query(query, callback); // Execute the query and pass the result to the callback
  }

  // Static method to retrieve books by category from the database
  static getByCategory(category, callback) {
    const query = "SELECT * FROM books WHERE category = ?"; // SQL query to select books by category
    db.query(query, [category], callback); // Execute the query with the category parameter and pass the result to the callback
  }

  // Static method to add a new book to the database
  static add(book, callback) {
    const query =
      "INSERT INTO books (title, author, category, publicationYear, pdf_path) VALUES (?, ?, ?, ?, ?)"; // SQL query to insert a new book
    const params = [
      book.title, // Book title
      book.author, // Book author
      book.category, // Book category
      book.publicationYear, // Book publication year
      book.pdfPath, // Path to the uploaded PDF file
    ];
    db.query(query, params, callback); // Execute the insert query with the parameters and pass the result to the callback
  }
}

module.exports = Book; // Export the Book class for use in other parts of the application
