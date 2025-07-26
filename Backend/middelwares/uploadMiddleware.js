import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';

dotenv.config(); // Load environment variables

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer storage for Cloudinary
// This uses multer-storage-cloudinary, which simplifies the process.
// If you don't have multer-storage-cloudinary, you'll need to install it:
// npm install multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'course_images', // Folder name in Cloudinary
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => `${file.originalname.split('.')[0]}-${Date.now()}`, // Unique public ID
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// Middleware to handle single image upload
const uploadImage = asyncHandler(async (req, res, next) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(400);
      throw new Error(`Multer error: ${err.message}`);
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(500);
      throw new Error(`Upload error: ${err.message}`);
    }

    // If file was uploaded successfully, its Cloudinary URL will be in req.file.path
    if (req.file) {
      req.body.imageUrl = req.file.path; // Attach the Cloudinary URL to req.body.imageUrl
    } else {
      // If no file was uploaded, but it's not an error (e.g., for update where image is optional)
      // We can decide to throw an error or just proceed without an image URL.
      // For now, we'll let the controller handle missing image URL if it's required.
    }
    next();
  });
});

export { uploadImage };
