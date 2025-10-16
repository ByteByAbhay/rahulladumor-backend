const express = require("express");
const {
  getCaseStudies,
  getCaseStudy,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
} = require("../controllers/caseStudies.controller");
const { validateCaseStudy } = require("../middleware/validation");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CaseStudy:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - company
 *         - industry
 *         - challenge
 *         - image
 *         - timeline
 *         - teamSize
 *         - solution
 *         - results
 *         - technologies
 *         - clientQuote
 *       properties:
 *         id:
 *           type: number
 *         title:
 *           type: string
 *         company:
 *           type: string
 *         industry:
 *           type: string
 *         challenge:
 *           type: string
 *         image:
 *           type: string
 *         timeline:
 *           type: string
 *         teamSize:
 *           type: string
 *         metrics:
 *           type: object
 *         beforeStats:
 *           type: object
 *         afterStats:
 *           type: object
 *         solution:
 *           type: string
 *         results:
 *           type: array
 *           items:
 *             type: string
 *         technologies:
 *           type: array
 *           items:
 *             type: string
 *         clientQuote:
 *           type: string
 */

/**
 * @swagger
 * /api/case-studies:
 *   get:
 *     summary: Get all case studies
 *     tags: [Case Studies]
 *     responses:
 *       200:
 *         description: Case studies retrieved successfully
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
 *                     $ref: '#/components/schemas/CaseStudy'
 *   post:
 *     summary: Create case study
 *     tags: [Case Studies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CaseStudy'
 *     responses:
 *       201:
 *         description: Case study created successfully
 *       400:
 *         description: Validation error
 */
router
  .route("/")
  .get(protect, getCaseStudies)
  .post(protect, validateCaseStudy, createCaseStudy);

/**
 * @swagger
 * /api/case-studies/{id}:
 *   get:
 *     summary: Get single case study
 *     tags: [Case Studies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Case study retrieved successfully
 *       404:
 *         description: Case study not found
 *   put:
 *     summary: Update case study
 *     tags: [Case Studies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CaseStudy'
 *     responses:
 *       200:
 *         description: Case study updated successfully
 *       404:
 *         description: Case study not found
 *   delete:
 *     summary: Delete case study
 *     tags: [Case Studies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Case study deleted successfully
 *       404:
 *         description: Case study not found
 */
router
  .route("/:id")
  .get(protect, getCaseStudy)
  .put(protect, validateCaseStudy, updateCaseStudy)
  .delete(protect, deleteCaseStudy);

module.exports = router;
