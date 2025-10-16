const express = require("express");
const { getProfile } = require("../controllers/profile.controller");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ProfileResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Full name
 *             title:
 *               type: string
 *               description: Professional title
 *             tagline:
 *               type: string
 *               description: Professional tagline
 *             email:
 *               type: string
 *               format: email
 *               description: Contact email
 *             phone:
 *               type: string
 *               description: Phone number
 *             location:
 *               type: string
 *               description: Current location
 *             website:
 *               type: string
 *               format: uri
 *               description: Personal website URL
 *             bio:
 *               type: string
 *               description: Professional biography
 *             social:
 *               type: object
 *               properties:
 *                 linkedin:
 *                   type: string
 *                   format: uri
 *                 github:
 *                   type: string
 *                   format: uri
 *                 twitter:
 *                   type: string
 *                   format: uri
 *                 instagram:
 *                   type: string
 *                   format: uri
 *             skills:
 *               type: object
 *               properties:
 *                 primary:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Primary skills
 *                 languages:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Programming languages
 *                 frameworks:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Frameworks and libraries
 *                 tools:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Tools and platforms
 *             certifications:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   issuer:
 *                     type: string
 *                   date:
 *                     type: string
 *                   credentialId:
 *                     type: string
 *                   url:
 *                     type: string
 *             experience:
 *               type: object
 *               properties:
 *                 years:
 *                   type: string
 *                   description: Years of experience
 *                 companies:
 *                   type: string
 *                   description: Number of companies worked with
 *                 projects:
 *                   type: string
 *                   description: Number of projects completed
 *             workHistory:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   company:
 *                     type: string
 *                   position:
 *                     type: string
 *                   period:
 *                     type: string
 *                   description:
 *                     type: string
 *                   achievements:
 *                     type: array
 *                     items:
 *                       type: string
 *             services:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   icon:
 *                     type: string
 *             testimonials:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   role:
 *                     type: string
 *                   company:
 *                     type: string
 *                   content:
 *                     type: string
 *                   rating:
 *                     type: number
 *             caseStudies:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   client:
 *                     type: string
 *                   challenge:
 *                     type: string
 *                   solution:
 *                     type: string
 *                   results:
 *                     type: array
 *                     items:
 *                       type: string
 *                   technologies:
 *                     type: array
 *                     items:
 *                       type: string
 *             additionalInfo:
 *               type: object
 *               properties:
 *                 interests:
 *                   type: array
 *                   items:
 *                     type: string
 *                 languages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       proficiency:
 *                         type: string
 *                 availability:
 *                   type: string
 */

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get comprehensive user profile information
 *     description: Returns complete professional profile including personal info, experience, skills, certifications, services, and more
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfileResponse'
 *             example:
 *               data:
 *                 name: "Rahul Ladumor"
 *                 title: "3x AWS Certified Full-Stack JavaScript & Cloud Engineer"
 *                 tagline: "Serverless Architecture Expert | Saving Companies $100K+ Annually"
 *                 email: "contact@acloudwithrahul.in"
 *                 phone: "+91-7567611653"
 *                 location: "Surat, Gujarat, India"
 *                 website: "https://www.rahulladumor.in"
 *                 bio: "3x AWS Certified Full-Stack JavaScript & Cloud Engineer with 8+ years of experience..."
 *                 social:
 *                   linkedin: "https://linkedin.com/in/rahulladumor"
 *                   github: "https://github.com/rahulladumor"
 *                   twitter: "https://twitter.com/ladumorrahul"
 *                 skills:
 *                   primary: ["AWS Lambda & Serverless Architecture", "Full-Stack JavaScript Development"]
 *                 certifications: []
 *                 experience:
 *                   years: "8+"
 *                   companies: "10+"
 *                   projects: "50+"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/profile", getProfile);

module.exports = router;
