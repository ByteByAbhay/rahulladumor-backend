const mongoose = require("mongoose");

const workExperienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
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
    description: {
      type: String,
      required: true,
    },
    technologies: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    achievements: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    collection: "workExperience",
  }
);

module.exports = mongoose.model("WorkExperience", workExperienceSchema);
