const Book = require("../models/Book");
const multer = require("multer");
const path = require("path");

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Use timestamp to avoid conflicts
  },
});

const upload = multer({ storage });

// Endpoint to get all books
exports.getBooks = (req, res) => {
  Book.getAll((err, results) => {
    if (err)
      return res.status(500).json({ error: "Failed to retrieve books." });
    res.json(results);
  });
};

// Endpoint to get books by category
exports.getBooksByCategory = (req, res, category) => {
  Book.getByCategory(category, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve books." });
    }
    res.json(results);
  });
};

// Endpoint to add a new book
exports.addBook = (req, res) => {
  const { title, author, category, publicationYear } = req.body;

  // Check if a PDF file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: "Please upload a PDF file." });
  }

  // Store only the filename
  const pdfFilename = path.basename(req.file.path); // Get only the filename

  const newBook = {
    title,
    author,
    category,
    publicationYear,
    pdfPath: pdfFilename, // Store only the filename
  };

  Book.add(newBook, (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to add book." });
    res
      .status(201)
      .json({ message: "Book added successfully!", bookId: result.insertId });
  });
};

// Use the upload middleware in your routes
exports.uploadBook = upload.single("pdf"); // 'pdf' is the key in form-data
