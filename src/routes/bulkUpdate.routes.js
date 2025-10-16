const express = require("express");
const { bulkUpdatePortfolio, bulkExportPortfolio } = require("../controllers/bulkUpdate.controller");
const { validateBulkUpdate } = require("../middleware/validation");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bulk Operations
 *   description: Bulk update and export operations for portfolio data
 */

/**
 * @swagger
 * /api/bulk-update:
 *   put:
 *     summary: Update all portfolio data with JSON structure
 *     description: Update all portfolio collections with data matching the structure of src/config/data.js
 *     tags: [Bulk Operations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Complete portfolio data structure
 *     responses:
 *       200:
 *         description: All data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 summary:
 *                   type: object
 *       400:
 *         description: Invalid data structure
 *       500:
 *         description: Server error
 */
router.put("/", protect, validateBulkUpdate, bulkUpdatePortfolio);

/**
 * @swagger
 * /api/bulk-update/export:
 *   get:
 *     summary: Export all portfolio data in original JSON structure
 *     description: Get all portfolio data in the same format as src/config/data.js
 *     tags: [Bulk Operations]
 *     responses:
 *       200:
 *         description: Portfolio data exported successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Complete portfolio data structure matching src/config/data.js
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get("/export", protect, bulkExportPortfolio);

module.exports = router;
