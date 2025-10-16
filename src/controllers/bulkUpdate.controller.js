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

/**
 * @swagger
 * /api/bulk-update:
 *   put:
 *     summary: Update all portfolio data with JSON structure
 *     description: Update all portfolio collections with data matching the structure of src/config/data.js
 *     tags: [Bulk Operations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               title:
 *                 type: string
 *               tagline:
 *                 type: string
 *               location:
 *                 type: string
 *               timezone:
 *                 type: string
 *               image:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               website:
 *                 type: string
 *               social:
 *                 type: object
 *               metrics:
 *                 type: array
 *               bio:
 *                 type: string
 *               experience:
 *               valuePropositions:
 *                 type: array
 *               skills:
 *                 type: object
 *               certifications:
 *                 type: array
 *               education:
 *                 type: array
 *               achievements:
 *                 type: array
 *               languages:
 *                 type: array
 *               availability:
 *                 type: object
 *               services:
 *                 type: array
 *               workExperience:
 *                 type: array
 *               problemSection:
 *                 type: object
 *               solutionSection:
 *                 type: object
 *               credentialsSection:
 *                 type: object
 *               servicesSection:
 *                 type: object
 *               testimonialsSection:
 *                 type: object
 *               caseStudiesSection:
 *                 type: object
 *               aboutSection:
 *                 type: object
 *     responses:
 *       200:
 *         description: All data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 summary:
 *                   type: object
 *       400:
 *         description: Invalid data structure
 *       500:
 *         description: Server error
 */
const bulkUpdatePortfolio = async (req, res) => {
  try {
    const portfolioData = req.body;
    const updateSummary = {};

    // Clear existing data
    console.log("🗑️ Clearing existing data...");
    await Promise.all([
      PersonalInfo.deleteMany({}),
      Skills.deleteMany({}),
      Certifications.deleteMany({}),
      Education.deleteMany({}),
      Services.deleteMany({}),
      WorkExperience.deleteMany({}),
      Testimonials.deleteMany({}),
      CaseStudies.deleteMany({}),
      SectionData.deleteMany({}),
      AdditionalInfo.deleteMany({}),
    ]);

    // Update Personal Information
    if (portfolioData.name || portfolioData.title || portfolioData.email) {
      const personalInfoData = {
        name: portfolioData.name,
        title: portfolioData.title,
        tagline: portfolioData.tagline,
        location: portfolioData.location,
        timezone: portfolioData.timezone,
        image: portfolioData.image,
        email: portfolioData.email,
        phone: portfolioData.phone,
        website: portfolioData.website,
        social: portfolioData.social,
        metrics: portfolioData.metrics,
        bio: portfolioData.bio,
        experience: portfolioData.experience,
        valuePropositions: portfolioData.valuePropositions,
        languages: portfolioData.languages,
        availability: portfolioData.availability,
        achievements: portfolioData.achievements,
      };
      
      const personalInfo = await PersonalInfo.create(personalInfoData);
      updateSummary.personalInfo = 1;
    }

    // Update Skills
    if (portfolioData.skills) {
      const skills = await Skills.create(portfolioData.skills);
      updateSummary.skills = 1;
    }

    // Update Certifications
    if (portfolioData.certifications && Array.isArray(portfolioData.certifications)) {
      await Certifications.insertMany(portfolioData.certifications);
      updateSummary.certifications = portfolioData.certifications.length;
    }

    // Update Education
    if (portfolioData.education && Array.isArray(portfolioData.education)) {
      await Education.insertMany(portfolioData.education);
      updateSummary.education = portfolioData.education.length;
    }

    // Update Services
    if (portfolioData.services && Array.isArray(portfolioData.services)) {
      await Services.insertMany(portfolioData.services);
      updateSummary.services = portfolioData.services.length;
    }

    // Update Work Experience
    if (portfolioData.workExperience && Array.isArray(portfolioData.workExperience)) {
      await WorkExperience.insertMany(portfolioData.workExperience);
      updateSummary.workExperience = portfolioData.workExperience.length;
    }

    // Update Testimonials
    if (portfolioData.testimonialsSection?.testimonials && Array.isArray(portfolioData.testimonialsSection.testimonials)) {
      await Testimonials.insertMany(portfolioData.testimonialsSection.testimonials);
      updateSummary.testimonials = portfolioData.testimonialsSection.testimonials.length;
    }

    // Update Case Studies
    if (portfolioData.caseStudiesSection?.caseStudies && Array.isArray(portfolioData.caseStudiesSection.caseStudies)) {
      await CaseStudies.insertMany(portfolioData.caseStudiesSection.caseStudies);
      updateSummary.caseStudies = portfolioData.caseStudiesSection.caseStudies.length;
    }

    // Update Section Data
    const sectionDataToUpdate = [
      { sectionType: "problemSection", data: portfolioData.problemSection },
      { sectionType: "solutionSection", data: portfolioData.solutionSection },
      { sectionType: "credentialsSection", data: portfolioData.credentialsSection },
      { sectionType: "servicesSection", data: portfolioData.servicesSection },
      { sectionType: "testimonialsSection", data: portfolioData.testimonialsSection },
      { sectionType: "caseStudiesSection", data: portfolioData.caseStudiesSection },
      { sectionType: "aboutSection", data: portfolioData.aboutSection },
    ];

    let sectionCount = 0;
    for (const sectionData of sectionDataToUpdate) {
      if (sectionData.data) {
        await SectionData.create(sectionData);
        sectionCount++;
      }
    }
    updateSummary.sectionData = sectionCount;

    // Update Additional Information
    if (portfolioData.additionalInfo) {
      await AdditionalInfo.create(portfolioData.additionalInfo);
      updateSummary.additionalInfo = 1;
    }

    res.status(200).json({
      success: true,
      message: "Portfolio data updated successfully",
      summary: updateSummary,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Bulk update error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update portfolio data",
      error: error.message,
    });
  }
};

/**
 * @swagger
 * /api/bulk-export:
 *   get:
 *     summary: Export all portfolio data in original JSON structure
 *     description: Get all portfolio data in the same format as src/config/data.js
 *     tags: [Bulk Operations]
 *     responses:
 *       200:
 *         description: Portfolio data exported successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Server error
 */
const bulkExportPortfolio = async (req, res) => {
  try {
    // Fetch all data from collections
    const [
      personalInfo,
      skills,
      certifications,
      education,
      services,
      workExperience,
      testimonials,
      caseStudies,
      sectionData,
      additionalInfo,
    ] = await Promise.all([
      PersonalInfo.findOne(),
      Skills.findOne(),
      Certifications.find(),
      Education.find(),
      Services.find(),
      WorkExperience.find(),
      Testimonials.find(),
      CaseStudies.find(),
      SectionData.find(),
      AdditionalInfo.findOne(),
    ]);
    console.log("🚀 ~ bulkExportPortfolio ~ personalInfo:", personalInfo);

    // Build section data object
    const sections = {};
    sectionData.forEach(section => {
      sections[section.sectionType] = section.data;
    });

    // Construct the complete portfolio data structure
    const portfolioData = {
      // Personal Information fields
      ...(personalInfo ? {
        name: personalInfo.name,
        title: personalInfo.title,
        tagline: personalInfo.tagline,
        location: personalInfo.location,
        timezone: personalInfo.timezone,
        image: personalInfo.image,
        email: personalInfo.email,
        phone: personalInfo.phone,
        website: personalInfo.website,
        social: personalInfo.social,
        metrics: personalInfo.metrics,
        bio: personalInfo.bio,
        experience: personalInfo.experience,
        valuePropositions: personalInfo.valuePropositions,
        languages: personalInfo.languages,
        availability: personalInfo.availability,
        achievements: personalInfo.achievements,
      } : {}),

      // Skills
      ...(skills ? { skills: skills } : {}),

      // Arrays
      certifications: certifications || [],
      education: education || [],
      services: services || [],
      workExperience: workExperience || [],

      // Section data
      ...sections,

      // Add testimonials and case studies to their respective sections
      ...(sections.testimonialsSection ? {
        testimonialsSection: {
          ...sections.testimonialsSection,
          testimonials: testimonials || []
        }
      } : { testimonialsSection: { testimonials: testimonials || [] } }),

      ...(sections.caseStudiesSection ? {
        caseStudiesSection: {
          ...sections.caseStudiesSection,
          caseStudies: caseStudies || []
        }
      } : { caseStudiesSection: { caseStudies: caseStudies || [] } }),

      // Additional Information
      ...(additionalInfo ? { additionalInfo } : {}),
    };

    res.status(200).json(portfolioData);

  } catch (error) {
    console.error("Bulk export error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to export portfolio data",
      error: error.message,
    });
  }
};

module.exports = {
  bulkUpdatePortfolio,
  bulkExportPortfolio,
};
