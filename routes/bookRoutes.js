const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/", bookController.getBooks);
router.get("/kids", (req, res) =>
  bookController.getBooksByCategory(req, res, "kids")
);

// Apply age restriction middleware for adult books (18+)
router.get("/adult", (req, res) =>
  bookController.getBooksByCategory(req, res, "adult")
);

router.post("/", upload.single("pdf"), bookController.addBook);
module.exports = router;
