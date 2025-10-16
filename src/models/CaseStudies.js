const mongoose = require("mongoose");

const caseStudiesSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    challenge: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    timeline: {
      type: String,
      required: true,
    },
    teamSize: {
      type: String,
      required: true,
    },
    metrics: {
      costReduction: String,
      monthlySaving: String,
      performanceGain: String,
      uptimeImprovement: String,
      securityScore: String,
      complianceAchieved: String,
      costOptimization: String,
      scalability: String,
      deploymentSpeed: String,
      maintenance: String,
    },
    beforeStats: {
      monthlySpend: String,
      avgResponseTime: String,
      uptime: String,
      scalingIssues: String,
      securityScore: String,
      compliance: String,
      auditTime: String,
      incidents: String,
      deploymentTime: String,
      scaling: String,
      maintenance: String,
    },
    afterStats: {
      monthlySpend: String,
      avgResponseTime: String,
      uptime: String,
      scalingIssues: String,
      securityScore: String,
      compliance: String,
      auditTime: String,
      incidents: String,
      deploymentTime: String,
      scaling: String,
      maintenance: String,
    },
    solution: {
      type: String,
      required: true,
    },
    results: [
      {
        type: String,
        required: true,
      },
    ],
    technologies: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    clientQuote: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "caseStudies",
  }
);

module.exports = mongoose.model("CaseStudies", caseStudiesSchema);
