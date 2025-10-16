const mongoose = require("mongoose");

const sectionDataSchema = new mongoose.Schema(
  {
    sectionType: {
      type: String,
      required: true,
      enum: [
        "problemSection",
        "solutionSection",
        "credentialsSection",
        "servicesSection",
        "testimonialsSection",
        "caseStudiesSection",
        "aboutSection",
      ],
      unique: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "sectionData",
  }
);

module.exports = mongoose.model("SectionData", sectionDataSchema);
