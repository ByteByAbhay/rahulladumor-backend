const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    deliverables: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    collection: "services",
  }
);

module.exports = mongoose.model("Services", servicesSchema);
