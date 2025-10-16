const express = require("express");
const {
  getWorkExperiences,
  getWorkExperience,
  createWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
} = require("../controllers/workExperience.controller");
const { validateWorkExperience } = require("../middleware/validation");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     WorkExperience:
 *       type: object
 *       required:
 *         - company
 *         - position
 *         - duration
 *         - location
 *         - description
 *         - technologies
 *         - achievements
 *       properties:
 *         company:
 *           type: string
 *         position:
 *           type: string
 *         duration:
 *           type: string
 *         location:
 *           type: string
 *         description:
 *           type: string
 *         technologies:
 *           type: array
 *           items:
 *             type: string
 *         achievements:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /api/work-experience:
 *   get:
 *     summary: Get all work experiences
 *     tags: [Work Experience]
 *     responses:
 *       200:
 *         description: Work experiences retrieved successfully
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
 *                     $ref: '#/components/schemas/WorkExperience'
 *   post:
 *     summary: Create work experience
 *     tags: [Work Experience]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkExperience'
 *     responses:
 *       201:
 *         description: Work experience created successfully
 *       400:
 *         description: Validation error
 */
router
  .route("/")
  .get(protect, getWorkExperiences)
  .post(protect, validateWorkExperience, createWorkExperience);

/**
 * @swagger
 * /api/work-experience/{id}:
 *   get:
 *     summary: Get single work experience
 *     tags: [Work Experience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Work experience retrieved successfully
 *       404:
 *         description: Work experience not found
 *   put:
 *     summary: Update work experience
 *     tags: [Work Experience]
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
 *             $ref: '#/components/schemas/WorkExperience'
 *     responses:
 *       200:
 *         description: Work experience updated successfully
 *       404:
 *         description: Work experience not found
 *   delete:
 *     summary: Delete work experience
 *     tags: [Work Experience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Work experience deleted successfully
 *       404:
 *         description: Work experience not found
 */
router
  .route("/:id")
  .get(protect, getWorkExperience)
  .put(protect, validateWorkExperience, updateWorkExperience)
  .delete(protect, deleteWorkExperience);

module.exports = router;
