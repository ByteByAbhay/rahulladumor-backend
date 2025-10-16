const express = require("express");
const { getHealth } = require("../controllers/health.controller");

const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Get application health status
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Application is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
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
router.get("/health", getHealth);

module.exports = router;
