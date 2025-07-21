import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const jwtSecret = process.env.JWT_SECRET;

export default jwtSecret;
