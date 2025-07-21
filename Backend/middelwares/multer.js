// middleware/multer.js
import multer from 'multer';
const storage = multer.memoryStorage(); // we send image buffer to Cloudinary
const upload = multer({ storage });
export default upload;
