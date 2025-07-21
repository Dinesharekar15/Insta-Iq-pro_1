import mongoose from "mongoose";


const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email'], // Optional: Email format check
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, 'Phone number must be 10 digits'], // Optional: Simple validation
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Contact = mongoose.model("Contact", contactSchema);
export default Contact;