const mongoose = require("mongoose");

const certificationsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    issuer: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: String,
      required: true,
    },
    credentialId: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: false,
      trim: true,
      default: "Award",
    },
  },
  {
    timestamps: true,
    collection: "certifications",
  }
);

module.exports = mongoose.model("Certifications", certificationsSchema);
