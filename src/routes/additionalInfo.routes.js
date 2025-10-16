const express = require("express");
const {
  getAdditionalInfo,
  createAdditionalInfo,
  updateAdditionalInfo,
  deleteAdditionalInfo,
} = require("../controllers/additionalInfo.controller");
const { validateAdditionalInfo } = require("../middleware/validation");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AdditionalInfo:
 *       type: object
 *       properties:
 *         speakingEngagements:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               event:
 *                 type: string
 *               topic:
 *                 type: string
 *               date:
 *                 type: string
 *               audience:
 *                 type: string
 *         publications:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               platform:
 *                 type: string
 *               date:
 *                 type: string
 *               url:
 *                 type: string
 *               views:
 *                 type: string
 *         communityInvolvement:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               organization:
 *                 type: string
 *               role:
 *                 type: string
 *               duration:
 *                 type: string
 *               activities:
 *                 type: array
 *                 items:
 *                   type: string
 *         awards:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               issuer:
 *                 type: string
 *               year:
 *                 type: string
 *               description:
 *                 type: string
 *         subjectOptions:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *               label:
 *                 type: string
 */

/**
 * @swagger
 * tags:
 *   name: Additional Info
 *   description: Additional professional information management
 */

/**
 * @swagger
 * /api/additional-info:
 *   get:
 *     summary: Get additional information
 *     tags: [Additional Info]
 *     responses:
 *       200:
 *         description: Additional information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdditionalInfo'
 *       404:
 *         description: Additional information not found
 *   post:
 *     summary: Create additional information
 *     tags: [Additional Info]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdditionalInfo'
 *     responses:
 *       201:
 *         description: Additional information created successfully
 *       400:
 *         description: Validation error
 */
router
  .route("/")
  .get(protect, getAdditionalInfo)
  .post(protect, validateAdditionalInfo, createAdditionalInfo);

/**
 * @swagger
 * /api/additional-info/{id}:
 *   put:
 *     summary: Update additional information
 *     tags: [Additional Info]
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
 *             $ref: '#/components/schemas/AdditionalInfo'
 *     responses:
 *       200:
 *         description: Additional information updated successfully
 *       404:
 *         description: Additional information not found
 *   delete:
 *     summary: Delete additional information
 *     tags: [Additional Info]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Additional information deleted successfully
 *       404:
 *         description: Additional information not found
 */
router
  .route("/:id")
  .put(protect, validateAdditionalInfo, updateAdditionalInfo)
  .delete(protect, deleteAdditionalInfo);

module.exports = router;
