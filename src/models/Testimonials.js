const mongoose = require("mongoose");

const testimonialsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    testimonial: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "testimonials",
  }
);

module.exports = mongoose.model("Testimonials", testimonialsSchema);
