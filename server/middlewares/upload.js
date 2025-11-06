const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      let folder = (req.body.folder || "").replace(/["']/g, "").trim();
      if (!folder) folder = "general";

      const uploadPath = path.join(__dirname, "..", "uploads", folder);

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    } catch (err) {
      console.error("Error creating upload folder:", err);
      cb(err);
    }
  },

  filename: function (req, file, cb) {
    try {
      const folder = (req.body.folder || "image").replace(/["']/g, "").trim();
      const ext = path.extname(file.originalname);
      const uniqueName = `${folder}-${Date.now()}${ext}`;
      cb(null, uniqueName);
    } catch (err) {
      console.error("Error naming file:", err);
      cb(err);
    }
  },
});

// Create multer instance
const multerUpload = multer({ storage });

/**
 * ✅ Universal Upload Middleware
 * Detects and supports:
 * - single file fields (e.g. icon, image)
 * - multiple files (e.g. images[])
 */
const upload = (req, res, next) => {
  // Support both single and multiple file fields dynamically
  const handler = multerUpload.any();

  handler(req, res, (err) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ message: "File upload failed", error: err });
    }
    next();
  });
};

module.exports = upload;
