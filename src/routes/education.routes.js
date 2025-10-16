const express = require("express");
const {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
} = require("../controllers/education.controller");
const { validateEducation } = require("../middleware/validation");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Education:
 *       type: object
 *       required:
 *         - institution
 *         - degree
 *         - duration
 *         - location
 *       properties:
 *         institution:
 *           type: string
 *           description: Name of the educational institution
 *           example: "Indian Institute of Technology, Roorkee"
 *         degree:
 *           type: string
 *           description: Degree or qualification obtained
 *           example: "PG Certificate in Agentic AI, GenAI & Machine Learning"
 *         duration:
 *           type: string
 *           description: Duration or period of study
 *           example: "May 2025 - February 2026"
 *         location:
 *           type: string
 *           description: Location of the institution
 *           example: "Roorkee, India"
 *         gpa:
 *           type: string
 *           description: Grade Point Average or academic performance
 *           example: "8.7"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Record creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Record last update timestamp
 */

/**
 * @swagger
 * /api/education:
 *   get:
 *     summary: Get all education records
 *     tags: [Education]
 *     description: Retrieve all education records sorted by creation date (newest first)
 *     responses:
 *       200:
 *         description: Education records retrieved successfully
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
 *                   description: Number of education records
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Education'
 *   post:
 *     summary: Create new education record
 *     tags: [Education]
 *     description: Create a new education record with institution, degree, duration, location, and optional GPA
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Education'
 *           example:
 *             institution: "Indian Institute of Technology, Roorkee"
 *             degree: "PG Certificate in Agentic AI, GenAI & Machine Learning"
 *             duration: "May 2025 - February 2026"
 *             location: "Roorkee, India"
 *             gpa: "In Progress"
 *     responses:
 *       201:
 *         description: Education record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Education record created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Education'
 *       400:
 *         description: Validation error
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
 *                   example: Validation failed
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                       message:
 *                         type: string
 */
router
  .route("/")
  .get(protect, getEducation)
  .post(protect, validateEducation, createEducation);

/**
 * @swagger
 * /api/education/{id}:
 *   get:
 *     summary: Get single education record
 *     tags: [Education]
 *     description: Retrieve a specific education record by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the education record
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Education record retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Education'
 *       404:
 *         description: Education record not found
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
 *                   example: Education record not found
 *   put:
 *     summary: Update education record
 *     tags: [Education]
 *     description: Update an existing education record with new information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the education record
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Education'
 *           example:
 *             institution: "Veer Narmad South Gujarat University"
 *             degree: "Master of Science - MS, Information Technology"
 *             duration: "2018 - 2020"
 *             location: "Surat, Gujarat, India"
 *             gpa: "8.7"
 *     responses:
 *       200:
 *         description: Education record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Education record updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Education'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Education record not found
 *   delete:
 *     summary: Delete education record
 *     tags: [Education]
 *     description: Permanently delete an education record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the education record
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Education record deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Education record deleted successfully
 *       404:
 *         description: Education record not found
 */
router
  .route("/:id")
  .get(protect, getEducationById)
  .put(protect, validateEducation, updateEducation)
  .delete(protect, deleteEducation);

module.exports = router;
