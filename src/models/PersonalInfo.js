const mongoose = require("mongoose");

const personalInfoSchema = new mongoose.Schema(
  {
    mainHeading: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    tagline: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    timezone: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      required: true,
      trim: true,
    },
    social: {
      linkedin: {
        type: String,
        required: true,
      },
      github: {
        type: String,
        required: true,
      },
      twitter: {
        type: String,
        required: true,
      },
    },
    metrics: [
      {
        value: {
          type: String,
          required: true,
        },
        label: {
          type: String,
          required: true,
        },
      },
    ],
    bio: {
      type: String,
      required: true,
    },
    experience: {
      years: {
        type: String,
        required: true,
      },
      companies: {
        type: String,
        required: true,
      },
      projects: {
        type: String,
        required: true,
      },
    },
    valuePropositions: [
      {
        type: String,
        required: true,
      },
    ],
    languages: [
      {
        type: String,
        required: true,
      },
    ],
    availability: {
      status: {
        type: String,
        required: true,
        enum: ["open", "busy", "unavailable"],
      },
      types: [
        {
          type: String,
          required: true,
        },
      ],
      remote: {
        type: Boolean,
        required: true,
      },
      relocation: {
        type: Boolean,
        required: true,
      },
      preferredRoles: [
        {
          type: String,
          required: true,
        },
      ],
    },
    achievements: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    collection: "personalInfo",
  }
);

module.exports = mongoose.model("PersonalInfo", personalInfoSchema);
