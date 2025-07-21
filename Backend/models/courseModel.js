import mongoose from "mongoose";
const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    numberOfRatings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


const Course = mongoose.model("Course", courseSchema);

export default Course;
