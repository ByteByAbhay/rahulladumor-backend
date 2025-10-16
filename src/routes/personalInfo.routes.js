const express = require("express");
const {
  getPersonalInfo,
  createPersonalInfo,
  updatePersonalInfo,
  deletePersonalInfo,
} = require("../controllers/personalInfo.controller");
const { validatePersonalInfo } = require("../middleware/validation");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PersonalInfo:
 *       type: object
 *       required:
 *         - name
 *         - title
 *         - tagline
 *         - location
 *         - timezone
 *         - image
 *         - email
 *         - phone
 *         - website
 *         - social
 *         - metrics
 *         - bio
 *         - experience
 *         - valuePropositions
 *         - languages
 *         - availability
 *         - achievements
 *       properties:
 *         name:
 *           type: string
 *         title:
 *           type: string
 *         tagline:
 *           type: string
 *         location:
 *           type: string
 *         timezone:
 *           type: string
 *         image:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         website:
 *           type: string
 *           format: uri
 *         social:
 *           type: object
 *           properties:
 *             linkedin:
 *               type: string
 *               format: uri
 *             github:
 *               type: string
 *               format: uri
 *             twitter:
 *               type: string
 *               format: uri
 *         metrics:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *               label:
 *                 type: string
 *         bio:
 *           type: string
 *         experience:
 *           type: object
 *           properties:
 *             years:
 *               type: string
 *             companies:
 *               type: string
 *             projects:
 *               type: string
 *         valuePropositions:
 *           type: array
 *           items:
 *             type: string
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *         availability:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               enum: [open, busy, unavailable]
 *             types:
 *               type: array
 *               items:
 *                 type: string
 *             remote:
 *               type: boolean
 *             relocation:
 *               type: boolean
 *             preferredRoles:
 *               type: array
 *               items:
 *                 type: string
 *         achievements:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /api/personal-info:
 *   get:
 *     summary: Get personal information
 *     tags: [Personal Info]
 *     responses:
 *       200:
 *         description: Personal information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/PersonalInfo'
 *       404:
 *         description: Personal information not found
 *   post:
 *     summary: Create personal information
 *     tags: [Personal Info]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonalInfo'
 *     responses:
 *       201:
 *         description: Personal information created successfully
 *       400:
 *         description: Validation error
 */
router
  .route("/")
  .get(protect, getPersonalInfo)
  .post(protect, validatePersonalInfo, createPersonalInfo);

/**
 * @swagger
 * /api/personal-info/{id}:
 *   put:
 *     summary: Update personal information
 *     tags: [Personal Info]
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
 *             $ref: '#/components/schemas/PersonalInfo'
 *     responses:
 *       200:
 *         description: Personal information updated successfully
 *       404:
 *         description: Personal information not found
 *   delete:
 *     summary: Delete personal information
 *     tags: [Personal Info]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Personal information deleted successfully
 *       404:
 *         description: Personal information not found
 */
router
  .route("/:id")
  .put(protect, validatePersonalInfo, updatePersonalInfo)
  .delete(protect, deletePersonalInfo);

module.exports = router;
