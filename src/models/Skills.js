const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema(
  {
    primary: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    secondary: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    tools: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
    collection: "skills",
  }
);

module.exports = mongoose.model("Skills", skillsSchema);
