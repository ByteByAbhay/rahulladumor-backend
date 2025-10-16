const mongoose = require("mongoose");
const PersonalInfo = require("../models/PersonalInfo");
const Skills = require("../models/Skills");
const Certifications = require("../models/Certifications");
const Education = require("../models/Education");
const Services = require("../models/Services");
const WorkExperience = require("../models/WorkExperience");
const Testimonials = require("../models/Testimonials");
const CaseStudies = require("../models/CaseStudies");
const SectionData = require("../models/SectionData");
const AdditionalInfo = require("../models/AdditionalInfo");
const { asyncHandler } = require("../middleware/errorHandler");

// Fallback to static data if MongoDB is empty
const staticData = require("../config/data");

/**
 * Get user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getProfile = asyncHandler(async (req, res) => {
  try {
    // Fetch all data from MongoDB
    const [
      personalInfo,
      skills,
      certifications,
      education,
      services,
      workExperience,
      testimonials,
      caseStudies,
      problemSection,
      solutionSection,
      credentialsSection,
      servicesSection,
      testimonialsSection,
      caseStudiesSection,
      aboutSection,
      additionalInfo,
    ] = await Promise.all([
      PersonalInfo.findOne().sort({ createdAt: -1 }),
      Skills.findOne().sort({ createdAt: -1 }),
      Certifications.find().sort({ createdAt: -1 }),
      Education.find().sort({ createdAt: -1 }),
      Services.find().sort({ createdAt: -1 }),
      WorkExperience.find().sort({ createdAt: -1 }),
      Testimonials.find().sort({ createdAt: -1 }),
      CaseStudies.find().sort({ createdAt: -1 }),
      SectionData.findOne({ sectionType: "problemSection" }),
      SectionData.findOne({ sectionType: "solutionSection" }),
      SectionData.findOne({ sectionType: "credentialsSection" }),
      SectionData.findOne({ sectionType: "servicesSection" }),
      SectionData.findOne({ sectionType: "testimonialsSection" }),
      SectionData.findOne({ sectionType: "caseStudiesSection" }),
      SectionData.findOne({ sectionType: "aboutSection" }),
      AdditionalInfo.findOne().sort({ createdAt: -1 }),
    ]);

    console.log("🚀 ~ personalInfo:", personalInfo);
    console.log("🚀 ~ skills:", skills);
    console.log("🚀 ~ certifications count:", certifications?.length);
    console.log("🚀 ~ education count:", education?.length);
    console.log("🚀 ~ services count:", services?.length);
    console.log("🚀 ~ workExperience count:", workExperience?.length);
    console.log("🚀 ~ testimonials count:", testimonials?.length);
    console.log("🚀 ~ caseStudies count:", caseStudies?.length);
    console.log("🚀 ~ additionalInfo:", additionalInfo);
    
    // Check database connection
    console.log("🔍 MongoDB connection state:", mongoose.connection.readyState);
    console.log("🔍 Database name:", mongoose.connection.db?.databaseName);

    // Build response object maintaining the same structure as before
    const profileData = {
      // Personal Information
      ...(personalInfo
        ? personalInfo.toObject()
        : {
            name: staticData.personalInfo?.name || "Rahul Ladumor",
            title:
              staticData.personalInfo?.title ||
              "3x AWS Certified Full-Stack JavaScript & Cloud Engineer",
            tagline:
              staticData.personalInfo?.tagline ||
              "Serverless Architecture Expert | Saving Companies $100K+ Annually",
            location:
              staticData.personalInfo?.location || "Surat, Gujarat, India",
            timezone: staticData.personalInfo?.timezone || "GMT+5:30",
            image:
              staticData.personalInfo?.image || "/assets/images/profile.avif",
            email: staticData.personalInfo?.email || "contact@acloudwithrahul.in",
            phone: staticData.personalInfo?.phone || "+91-7567611653",
            website:
              staticData.personalInfo?.website || "https://www.rahulladumor.in",
            social: staticData.personalInfo?.social || {},
            metrics: staticData.personalInfo?.metrics || [],
            bio: staticData.personalInfo?.bio || "",
            experience: staticData.personalInfo?.experience || {},
            valuePropositions: staticData.personalInfo?.valuePropositions || [],
            languages: staticData.personalInfo?.languages || [],
            availability: staticData.personalInfo?.availability || {},
            achievements: staticData.personalInfo?.achievements || [],
          }),

      // Skills
      skills: skills ? skills.toObject() : staticData.skills,

      // Certifications
      certifications:
        certifications.length > 0 ? certifications : staticData.certifications,

      // Education
      education: education.length > 0 ? education : staticData.education,

      // Services
      services: services.length > 0 ? services : staticData.services,

      // Work Experience
      workExperience:
        workExperience.length > 0 ? workExperience : staticData.workExperience,

      // Testimonials
      testimonials:
        testimonials.length > 0
          ? testimonials
          : staticData.testimonialsSection?.testimonials,

      // Case Studies
      caseStudies:
        caseStudies.length > 0
          ? caseStudies
          : staticData.caseStudiesSection?.caseStudies,

      // Section Data
      problemSection: problemSection
        ? problemSection.data
        : staticData.problemSection,
      solutionSection: solutionSection
        ? solutionSection.data
        : staticData.solutionSection,
      credentialsSection: credentialsSection
        ? credentialsSection.data
        : staticData.credentialsSection,
      servicesSection: servicesSection
        ? servicesSection.data
        : staticData.servicesSection,
      testimonialsSection: testimonialsSection
        ? testimonialsSection.data
        : staticData.testimonialsSection,
      caseStudiesSection: caseStudiesSection
        ? caseStudiesSection.data
        : staticData.caseStudiesSection,
      aboutSection: aboutSection ? aboutSection.data : staticData.aboutSection,

      // Additional Information
      additionalInfo: additionalInfo ? additionalInfo.toObject() : staticData.additionalInfo,
    };

    res.status(200).json({
      status: "success",
      data: profileData,
    });
  } catch (error) {
    console.error("Error fetching profile data:", error);

    // Fallback to static data in case of any error
    res.status(200).json({
      status: "success",
      data: staticData,
      message: "Serving static data due to database error",
    });
  }
});

module.exports = {
  getProfile,
};
