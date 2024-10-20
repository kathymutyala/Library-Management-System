const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the uploads directory exists or create it
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the absolute path to avoid ENOENT errors
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now(); // Get current timestamp
    const fileExtension = path.extname(file.originalname); // Get file extension
    const originalFileName = path.basename(file.originalname, fileExtension); // Get the original filename without extension
    // Generate a new filename
    cb(null, `${uniqueSuffix}-${originalFileName}${fileExtension}`);
  },
});

// Validate that only PDF files can be uploaded
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

// Handle file size limits (e.g., max 5MB)
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB size limit
  fileFilter: fileFilter,
});

module.exports = upload;
