import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String }, // for logo or image
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
