const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth");
const {
  triggerDeployment,
  getDeploymentStatus,
} = require("../controllers/deployment.controller");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// All deployment routes require admin authentication
router.use(protect);
router.use(adminOnly);

/**
 * POST /api/deployment/trigger
 * Trigger GitHub Actions workflow deployment
 */
router.post("/trigger", triggerDeployment);

/**
 * GET /api/deployment/status
 * Get deployment configuration status
 */
router.get("/status", getDeploymentStatus);

module.exports = router;
