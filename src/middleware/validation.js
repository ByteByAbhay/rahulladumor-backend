const Joi = require("joi");

// Generic validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        details: error.details.map((detail) => ({
          field: detail.path.join("."),
          message: detail.message,
        })),
      });
    }
    next();
  };
};

// Personal Info validation schema
const personalInfoSchema = Joi.object({
  mainHeading: Joi.string().required().trim(),
  name: Joi.string().required().trim(),
  title: Joi.string().required().trim(),
  tagline: Joi.string().required().trim(),
  location: Joi.string().required().trim(),
  timezone: Joi.string().required(),
  image: Joi.string().required(),
  email: Joi.string().email().required().trim(),
  phone: Joi.string().required().trim(),
  website: Joi.string().uri().required().trim(),
  social: Joi.object({
    linkedin: Joi.string().uri().required(),
    github: Joi.string().uri().required(),
    twitter: Joi.string().uri().required(),
  }).required(),
  metrics: Joi.array()
    .items(
      Joi.object({
        value: Joi.string().required(),
        label: Joi.string().required(),
      })
    )
    .required(),
  bio: Joi.string().required(),
  experience: Joi.object({
    years: Joi.string().required(),
    companies: Joi.string().required(),
    projects: Joi.string().required(),
  }).required(),
  valuePropositions: Joi.array().items(Joi.string().required()).required(),
  languages: Joi.array().items(Joi.string().required()).required(),
  availability: Joi.object({
    status: Joi.string().valid("open", "busy", "unavailable").required(),
    types: Joi.array().items(Joi.string().required()).required(),
    remote: Joi.boolean().required(),
    relocation: Joi.boolean().required(),
    preferredRoles: Joi.array().items(Joi.string().required()).required(),
  }).required(),
  achievements: Joi.array().items(Joi.string().required()).required(),
});

// Skills validation schema
const skillsSchema = Joi.object({
  primary: Joi.array().items(Joi.string().required().trim()).required(),
  secondary: Joi.array().items(Joi.string().required().trim()).required(),
  tools: Joi.array().items(Joi.string().required().trim()).required(),
});

// Certifications validation schema
const certificationsSchema = Joi.object({
  name: Joi.string().required().trim(),
  issuer: Joi.string().required().trim(),
  year: Joi.string().required(),
  credentialId: Joi.string().required().trim(),
  level: Joi.string().required().trim(),
  icon: Joi.string().optional().trim().default("Award"),
});

// Services validation schema
const servicesSchema = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().required(),
  duration: Joi.string().required(),
  deliverables: Joi.array().items(Joi.string().required()).required(),
});

// Work Experience validation schema
const workExperienceSchema = Joi.object({
  company: Joi.string().required().trim(),
  position: Joi.string().required().trim(),
  duration: Joi.string().required(),
  location: Joi.string().required().trim(),
  description: Joi.string().required(),
  technologies: Joi.array().items(Joi.string().required().trim()).required(),
  achievements: Joi.array().items(Joi.string().required()).required(),
});

// Testimonials validation schema
const testimonialsSchema = Joi.object({
  name: Joi.string().required().trim(),
  position: Joi.string().required().trim(),
  company: Joi.string().required().trim(),
  testimonial: Joi.string().required(),
  image: Joi.string().required(),
  linkedin: Joi.string().uri().required(),
});

// Case Studies validation schema
const caseStudiesSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required().trim(),
  company: Joi.string().required().trim(),
  industry: Joi.string().required().trim(),
  challenge: Joi.string().required(),
  image: Joi.string().required(),
  timeline: Joi.string().required(),
  teamSize: Joi.string().required(),
  metrics: Joi.object().unknown(true),
  beforeStats: Joi.object().unknown(true),
  afterStats: Joi.object().unknown(true),
  solution: Joi.string().required(),
  results: Joi.array().items(Joi.string().required()).required(),
  technologies: Joi.array().items(Joi.string().required().trim()).required(),
  clientQuote: Joi.string().required(),
});

// Section Data validation schema
const sectionDataSchema = Joi.object({
  sectionType: Joi.string()
    .valid(
      "problemSection",
      "solutionSection",
      "credentialsSection",
      "servicesSection",
      "testimonialsSection",
      "caseStudiesSection",
      "aboutSection"
    )
    .required(),
  data: Joi.object().required(),
});

/**
 * Validation for bulk update operations
 */
const validateBulkUpdate = (req, res, next) => {
  const { body } = req;

  // Basic validation - at least one field should be present
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Request body cannot be empty",
    });
  }

  // Validate arrays if present
  const arrayFields = ['certifications', 'education', 'services', 'workExperience', 'valuePropositions', 'languages', 'achievements', 'metrics'];
  
  for (const field of arrayFields) {
    if (body[field] && !Array.isArray(body[field])) {
      return res.status(400).json({
        success: false,
        message: `Field '${field}' must be an array`,
      });
    }
  }

  // Validate nested testimonials and case studies
  if (body.testimonialsSection?.testimonials && !Array.isArray(body.testimonialsSection.testimonials)) {
    return res.status(400).json({
      success: false,
      message: "testimonialsSection.testimonials must be an array",
    });
  }

  if (body.caseStudiesSection?.caseStudies && !Array.isArray(body.caseStudiesSection.caseStudies)) {
    return res.status(400).json({
      success: false,
      message: "caseStudiesSection.caseStudies must be an array",
    });
  }

  next();
};

// Education validation schema
const educationSchema = Joi.object({
  institution: Joi.string().required().trim(),
  degree: Joi.string().required().trim(),
  duration: Joi.string().required(),
  location: Joi.string().required().trim(),
  gpa: Joi.string().optional().trim(),
});

// Additional Info validation schema
const additionalInfoSchema = Joi.object({
  speakingEngagements: Joi.array().items(
    Joi.object({
      event: Joi.string().required().trim(),
      topic: Joi.string().required().trim(),
      date: Joi.string().required(),
      audience: Joi.string().required().trim(),
    })
  ).default([]),
  publications: Joi.array().items(
    Joi.object({
      title: Joi.string().required().trim(),
      platform: Joi.string().required().trim(),
      date: Joi.string().required(),
      url: Joi.string().required().trim(),
      views: Joi.string().required().trim(),
    })
  ).default([]),
  communityInvolvement: Joi.array().items(
    Joi.object({
      organization: Joi.string().required().trim(),
      role: Joi.string().required().trim(),
      duration: Joi.string().required().trim(),
      activities: Joi.array().items(Joi.string().required()).required(),
    })
  ).default([]),
  awards: Joi.array().items(
    Joi.object({
      title: Joi.string().required().trim(),
      issuer: Joi.string().required().trim(),
      year: Joi.string().required(),
      description: Joi.string().required(),
    })
  ).default([]),
  subjectOptions: Joi.array().items(
    Joi.object({
      value: Joi.string().required().trim(),
      label: Joi.string().required().trim(),
    })
  ).default([]),
});

// Authentication validation schemas
const authRegisterSchema = Joi.object({
  username: Joi.string().required().trim().min(3).max(30),
  email: Joi.string().email().required().trim().lowercase(),
  password: Joi.string().required().min(6),
  role: Joi.string().valid("admin", "user").default("user"),
});

const authLoginSchema = Joi.object({
  identifier: Joi.string().required().trim(),
  password: Joi.string().required(),
});

// Validation middleware functions
const validatePersonalInfo = validate(personalInfoSchema);
const validateSkills = validate(skillsSchema);
const validateCertification = validate(certificationsSchema);
const validateService = validate(servicesSchema);
const validateWorkExperience = validate(workExperienceSchema);
const validateTestimonial = validate(testimonialsSchema);
const validateCaseStudy = validate(caseStudiesSchema);
const validateSectionData = validate(sectionDataSchema);
const validateEducation = validate(educationSchema);
const validateAdditionalInfo = validate(additionalInfoSchema);
const validateAuth = validate(authRegisterSchema);
const validateLogin = validate(authLoginSchema);

module.exports = {
  validatePersonalInfo,
  validateSkills,
  validateCertification,
  validateService,
  validateWorkExperience,
  validateTestimonial,
  validateCaseStudy,
  validateSectionData,
  validateEducation,
  validateAdditionalInfo,
  validateBulkUpdate,
  validateAuth,
  validateLogin,
};
