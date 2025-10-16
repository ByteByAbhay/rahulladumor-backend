const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: true,
      trim: true,
    },
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    gpa: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "education",
  }
);

module.exports = mongoose.model("Education", educationSchema);
