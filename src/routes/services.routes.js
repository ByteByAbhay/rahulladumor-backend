const express = require("express");
const {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} = require("../controllers/services.controller");
const { validateService } = require("../middleware/validation");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - duration
 *         - deliverables
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         duration:
 *           type: string
 *         deliverables:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Services retrieved successfully
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
 *                     $ref: '#/components/schemas/Service'
 *   post:
 *     summary: Create service
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       201:
 *         description: Service created successfully
 *       400:
 *         description: Validation error
 */
router
  .route("/")
  .get(protect, getServices)
  .post(protect, validateService, createService);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get single service
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service retrieved successfully
 *       404:
 *         description: Service not found
 *   put:
 *     summary: Update service
 *     tags: [Services]
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
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       404:
 *         description: Service not found
 *   delete:
 *     summary: Delete service
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 */
router
  .route("/:id")
  .get(protect, getService)
  .put(protect, validateService, updateService)
  .delete(protect, deleteService);

module.exports = router;
