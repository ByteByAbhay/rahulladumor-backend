const express = require("express");
const {
  getSkills,
  createSkills,
  updateSkills,
  deleteSkills,
} = require("../controllers/skills.controller");
const { validateSkills } = require("../middleware/validation");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Skills:
 *       type: object
 *       required:
 *         - primary
 *         - secondary
 *         - tools
 *       properties:
 *         primary:
 *           type: array
 *           items:
 *             type: string
 *         secondary:
 *           type: array
 *           items:
 *             type: string
 *         tools:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /api/skills:
 *   get:
 *     summary: Get skills
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: Skills retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Skills'
 *       404:
 *         description: Skills not found
 *   post:
 *     summary: Create skills
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Skills'
 *     responses:
 *       201:
 *         description: Skills created successfully
 *       400:
 *         description: Validation error
 */
router.route("/").get(protect, getSkills).post(protect, validateSkills, createSkills);

/**
 * @swagger
 * /api/skills/{id}:
 *   put:
 *     summary: Update skills
 *     tags: [Skills]
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
 *             $ref: '#/components/schemas/Skills'
 *     responses:
 *       200:
 *         description: Skills updated successfully
 *       404:
 *         description: Skills not found
 *   delete:
 *     summary: Delete skills
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Skills deleted successfully
 *       404:
 *         description: Skills not found
 */
router
  .route("/:id")
  .put(protect, validateSkills, updateSkills)
  .delete(protect, deleteSkills);

module.exports = router;
