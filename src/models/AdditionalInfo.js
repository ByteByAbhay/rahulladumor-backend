const mongoose = require("mongoose");

const speakingEngagementSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
    trim: true,
  },
  topic: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
  audience: {
    type: String,
    required: true,
    trim: true,
  },
});

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  platform: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  views: {
    type: String,
    required: true,
    trim: true,
  },
});

const communityInvolvementSchema = new mongoose.Schema({
  organization: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: String,
    required: true,
    trim: true,
  },
  activities: {
    type: [String],
    required: true,
  },
});

const awardSchema = new mongoose.Schema({
  title: {
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
  description: {
    type: String,
    required: true,
  },
});

const subjectOptionSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    trim: true,
  },
  label: {
    type: String,
    required: true,
    trim: true,
  },
});

const additionalInfoSchema = new mongoose.Schema(
  {
    speakingEngagements: {
      type: [speakingEngagementSchema],
      default: [],
    },
    publications: {
      type: [publicationSchema],
      default: [],
    },
    communityInvolvement: {
      type: [communityInvolvementSchema],
      default: [],
    },
    awards: {
      type: [awardSchema],
      default: [],
    },
    subjectOptions: {
      type: [subjectOptionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AdditionalInfo", additionalInfoSchema);
