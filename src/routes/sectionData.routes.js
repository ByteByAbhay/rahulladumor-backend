const express = require("express");
const {
  getAllSectionData,
  getSectionData,
  createSectionData,
  updateSectionData,
  deleteSectionData,
} = require("../controllers/sectionData.controller");
const { validateSectionData } = require("../middleware/validation");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     SectionData:
 *       type: object
 *       required:
 *         - sectionType
 *         - data
 *       properties:
 *         sectionType:
 *           type: string
 *           enum: [problemSection, solutionSection, credentialsSection, servicesSection, testimonialsSection, caseStudiesSection, aboutSection]
 *         data:
 *           type: object
 */

/**
 * @swagger
 * /api/section-data:
 *   get:
 *     summary: Get all section data
 *     tags: [Section Data]
 *     responses:
 *       200:
 *         description: Section data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 count:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SectionData'
 *   post:
 *     summary: Create section data
 *     tags: [Section Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SectionData'
 *     responses:
 *       201:
 *         description: Section data created successfully
 *       400:
 *         description: Validation error
 */
router
  .route("/")
  .get(protect, getAllSectionData)
  .post(protect, validateSectionData, createSectionData);

/**
 * @swagger
 * /api/section-data/{sectionType}:
 *   get:
 *     summary: Get section data by type
 *     tags: [Section Data]
 *     parameters:
 *       - in: path
 *         name: sectionType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [problemSection, solutionSection, credentialsSection, servicesSection, testimonialsSection, caseStudiesSection, aboutSection]
 *     responses:
 *       200:
 *         description: Section data retrieved successfully
 *       404:
 *         description: Section data not found
 *   put:
 *     summary: Update section data
 *     tags: [Section Data]
 *     parameters:
 *       - in: path
 *         name: sectionType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [problemSection, solutionSection, credentialsSection, servicesSection, testimonialsSection, caseStudiesSection, aboutSection]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SectionData'
 *     responses:
 *       200:
 *         description: Section data updated successfully
 *       404:
 *         description: Section data not found
 *   delete:
 *     summary: Delete section data
 *     tags: [Section Data]
 *     parameters:
 *       - in: path
 *         name: sectionType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [problemSection, solutionSection, credentialsSection, servicesSection, testimonialsSection, caseStudiesSection, aboutSection]
 *     responses:
 *       200:
 *         description: Section data deleted successfully
 *       404:
 *         description: Section data not found
 */
router
  .route("/:sectionType")
  .get(protect, getSectionData)
  .put(protect, validateSectionData, updateSectionData)
  .delete(protect, deleteSectionData);

module.exports = router;
