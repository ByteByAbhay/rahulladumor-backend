/**
 * @swagger
 * components:
 *   schemas:
 *     HealthResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: ok
 *         timestamp:
 *           type: string
 *           format: date-time
 *           example: 2023-12-01T10:30:00.000Z
 */

/**
 * Get health status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getHealth = (req, res) => {
  try {
    const response = {
      status: "ok",
      timestamp: new Date().toISOString()
    };
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};

module.exports = {
  getHealth
};
