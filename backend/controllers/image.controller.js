import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const prefix = file.mimetype.startsWith('image/') ? 'image' : 'file';
    cb(null, `${prefix}-${uniqueSuffix}${ext}`);
  }
});

// File filter - accept both images and other files
const fileFilter = (req, file, cb) => {
  // Accept all file types
  cb(null, true);
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: fileFilter
});

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const isImage = req.file.mimetype.startsWith('image/');
    const fileUrl = `/uploads/${req.file.filename}`;
    
    res.status(200).json({
      fileUrl: fileUrl,
      imageUrl: isImage ? fileUrl : null, // For backward compatibility
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      fileType: req.file.mimetype,
      isImage: isImage
    });
  } catch (error) {
    console.log("error in uploadImage controller: ", error.message);
    res.status(500).json({ error: "Failed to upload file" });
  }
};

