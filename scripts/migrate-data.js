const mongoose = require("mongoose");
require("dotenv").config();

// Import models
const PersonalInfo = require("../src/models/PersonalInfo");
const Skills = require("../src/models/Skills");
const Certifications = require("../src/models/Certifications");
const Education = require("../src/models/Education");
const Services = require("../src/models/Services");
const WorkExperience = require("../src/models/WorkExperience");
const Testimonials = require("../src/models/Testimonials");
const CaseStudies = require("../src/models/CaseStudies");
const SectionData = require("../src/models/SectionData");
const AdditionalInfo = require("../src/models/AdditionalInfo");

// Import static data
const staticData = require("../src/config/data");

const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI);
    console.log('Database Name:', process.env.DB_NAME);
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME || 'rahulladumor_portfolio'
    });
    console.log("✅ MongoDB Connected for migration");
    console.log(`📊 Using database: ${mongoose.connection.name}`);
  } catch (error) {
    console.log("🚀 ~ connectDB ~ error:", error);
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const migrateData = async () => {
  try {
    console.log("🚀 Starting data migration...");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
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

    // Migrate Personal Information
    console.log("👤 Migrating personal information...");
    await PersonalInfo.create(staticData.personalInfo);

    // Migrate Skills
    console.log("🛠️  Migrating skills...");
    await Skills.create(staticData.skills);

    // Migrate Certifications
    console.log("🏆 Migrating certifications...");
    if (staticData.certifications && staticData.certifications.length > 0) {
      await Certifications.insertMany(staticData.certifications);
    }

    // Migrate Education
    console.log("🎓 Migrating education...");
    if (staticData.education && staticData.education.length > 0) {
      await Education.insertMany(staticData.education);
    }

    // Migrate Services
    console.log("💼 Migrating services...");
    if (staticData.services && staticData.services.length > 0) {
      await Services.insertMany(staticData.services);
    }

    // Migrate Work Experience
    console.log("💻 Migrating work experience...");
    if (staticData.workExperience && staticData.workExperience.length > 0) {
      await WorkExperience.insertMany(staticData.workExperience);
    }

    // Migrate Testimonials
    console.log("💬 Migrating testimonials...");
    if (
      staticData.testimonialsSection?.testimonials &&
      staticData.testimonialsSection.testimonials.length > 0
    ) {
      await Testimonials.insertMany(
        staticData.testimonialsSection.testimonials
      );
    }

    // Migrate Case Studies
    console.log("📊 Migrating case studies...");
    if (
      staticData.caseStudiesSection?.caseStudies &&
      staticData.caseStudiesSection.caseStudies.length > 0
    ) {
      await CaseStudies.insertMany(staticData.caseStudiesSection.caseStudies);
    }

    // Migrate Section Data
    console.log("📄 Migrating section data...");
    const sectionDataToMigrate = [
      { sectionType: "problemSection", data: staticData.problemSection },
      { sectionType: "solutionSection", data: staticData.solutionSection },
      {
        sectionType: "credentialsSection",
        data: staticData.credentialsSection,
      },
      { sectionType: "servicesSection", data: staticData.servicesSection },
      {
        sectionType: "testimonialsSection",
        data: staticData.testimonialsSection,
      },
      {
        sectionType: "caseStudiesSection",
        data: staticData.caseStudiesSection,
      },
      { sectionType: "aboutSection", data: staticData.aboutSection },
    ];

    for (const sectionData of sectionDataToMigrate) {
      if (sectionData.data) {
        await SectionData.create(sectionData);
        console.log(`   ✅ Migrated ${sectionData.sectionType}`);
      }
    }

    // Migrate Additional Information
    if (staticData.additionalInfo) {
      await AdditionalInfo.create(staticData.additionalInfo);
      console.log("   ✅ Migrated additionalInfo");
    }

    console.log("🎉 Data migration completed successfully!");

    // Display migration summary
    const counts = await Promise.all([
      PersonalInfo.countDocuments(),
      Skills.countDocuments(),
      Certifications.countDocuments(),
      Education.countDocuments(),
      Services.countDocuments(),
      WorkExperience.countDocuments(),
      Testimonials.countDocuments(),
      CaseStudies.countDocuments(),
      SectionData.countDocuments(),
      AdditionalInfo.countDocuments(),
    ]);

    console.log("\n📊 Migration Summary:");
    console.log(`   Personal Info: ${counts[0]} record(s)`);
    console.log(`   Skills: ${counts[1]} record(s)`);
    console.log(`   Certifications: ${counts[2]} record(s)`);
    console.log(`   Education: ${counts[3]} record(s)`);
    console.log(`   Services: ${counts[4]} record(s)`);
    console.log(`   Work Experience: ${counts[5]} record(s)`);
    console.log(`   Testimonials: ${counts[6]} record(s)`);
    console.log(`   Case Studies: ${counts[7]} record(s)`);
    console.log(`   Section Data: ${counts[8]} record(s)`);
    console.log(`   Additional Info: ${counts[9]} record(s)`);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
};

const runMigration = async () => {
  await connectDB();
  await migrateData();
  await mongoose.connection.close();
  console.log("🔒 Database connection closed");
  process.exit(0);
};

// Run migration if this file is executed directly
if (require.main === module) {
  runMigration();
}

module.exports = { migrateData, connectDB };
