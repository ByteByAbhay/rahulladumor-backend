const express = require("express");
const {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonials.controller");
const { validateTestimonial } = require("../middleware/validation");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Testimonial:
 *       type: object
 *       required:
 *         - name
 *         - position
 *         - company
 *         - testimonial
 *         - image
 *         - linkedin
 *       properties:
 *         name:
 *           type: string
 *         position:
 *           type: string
 *         company:
 *           type: string
 *         testimonial:
 *           type: string
 *         image:
 *           type: string
 *         linkedin:
 *           type: string
 *           format: uri
 */

/**
 * @swagger
 * /api/testimonials:
 *   get:
 *     summary: Get all testimonials
 *     tags: [Testimonials]
 *     responses:
 *       200:
 *         description: Testimonials retrieved successfully
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
 *                     $ref: '#/components/schemas/Testimonial'
 *   post:
 *     summary: Create testimonial
 *     tags: [Testimonials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Testimonial'
 *     responses:
 *       201:
 *         description: Testimonial created successfully
 *       400:
 *         description: Validation error
 */
router
  .route("/")
  .get(protect, getTestimonials)
  .post(protect, validateTestimonial, createTestimonial);

/**
 * @swagger
 * /api/testimonials/{id}:
 *   get:
 *     summary: Get single testimonial
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimonial retrieved successfully
 *       404:
 *         description: Testimonial not found
 *   put:
 *     summary: Update testimonial
 *     tags: [Testimonials]
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
 *             $ref: '#/components/schemas/Testimonial'
 *     responses:
 *       200:
 *         description: Testimonial updated successfully
 *       404:
 *         description: Testimonial not found
 *   delete:
 *     summary: Delete testimonial
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimonial deleted successfully
 *       404:
 *         description: Testimonial not found
 */
router
  .route("/:id")
  .get(protect, getTestimonial)
  .put(protect, validateTestimonial, updateTestimonial)
  .delete(protect, deleteTestimonial);

module.exports = router;
