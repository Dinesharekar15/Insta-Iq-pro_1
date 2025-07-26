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
    details: [ // NEW FIELD: Array of strings for course details/features
      {
        type: String,
      },
    ],
    purchasedBy: [ // NEW FIELD: Array to store IDs of users who purchased this course
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
      },
    ],
  },
  {
    timestamps: true,
  }
);


const Course = mongoose.model("Course", courseSchema);

export default Course;
