const express = require("express");
const {
  getCertifications,
  getCertification,
  createCertification,
  updateCertification,
  deleteCertification,
} = require("../controllers/certifications.controller");
const { validateCertification } = require("../middleware/validation");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Certifications
 *   description: API to manage certifications
 *   schemas:
 *     Certification:
 *       type: object
 *       required:
 *         - name
 *         - issuer
 *         - year
 *         - credentialId
 *         - level
 *       properties:
 *         name:
 *           type: string
 *           example: "AWS Certified Developer - Associate"
 *         issuer:
 *           type: string
 *           example: "Amazon Web Services"
 *         year:
 *           type: string
 *           example: "2023"
 *         credentialId:
 *           type: string
 *           example: "AWS-DVA-2023"
 *         level:
 *           type: string
 *           example: "Associate"
 *         icon:
 *           type: string
 *           example: "Award"
 *           default: "Award"
 */

/**
 * @swagger
 * /api/certifications:
 *   get:
 *     summary: Get all certifications
 *     tags: [Certifications]
 *     responses:
 *       200:
 *         description: Certifications retrieved successfully
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
 *                     $ref: '#/components/schemas/Certification'
 *   post:
 *     summary: Create certification
 *     tags: [Certifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certification'
 *     responses:
 *       201:
 *         description: Certification created successfully
 *       400:
 *         description: Validation error
 */
router
  .route("/")
  .get(protect, getCertifications)
  .post(protect, validateCertification, createCertification);

/**
 * @swagger
 * /api/certifications/{id}:
 *   get:
 *     summary: Get single certification
 *     tags: [Certifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certification retrieved successfully
 *       404:
 *         description: Certification not found
 *   put:
 *     summary: Update certification
 *     tags: [Certifications]
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
 *             $ref: '#/components/schemas/Certification'
 *     responses:
 *       200:
 *         description: Certification updated successfully
 *       404:
 *         description: Certification not found
 *   delete:
 *     summary: Delete certification
 *     tags: [Certifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certification deleted successfully
 *       404:
 *         description: Certification not found
 */
router
  .route("/:id")
  .get(protect, getCertification)
  .put(protect, validateCertification, updateCertification)
  .delete(protect, deleteCertification);

module.exports = router;
