const express = require("express");
const { sendContactEmail } = require("../controllers/email.controller");

const router = express.Router();

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Send contact form email
 *     description: Handles contact form submissions by sending confirmation email to user and notification email to admin
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactRequest'
 *           example:
 *             name: "John Doe"
 *             email: "john.doe@example.com"
 *             subject: "Inquiry about AWS consulting services"
 *             message: "I would like to discuss your AWS optimization services for my startup. We're currently spending too much on infrastructure and need expert guidance."
 *             contactMethod: "email"
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactResponse'
 *             example:
 *               success: true
 *               message: "Contact form submitted successfully"
 *               data:
 *                 userEmailSent: true
 *                 adminEmailSent: true
 *                 timestamp: "2023-12-01T10:30:00.000Z"
 *       400:
 *         description: Bad request - missing or invalid fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "All fields are required: name, email, subject, message"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error. Please try again later."
 */
router.post("/contact", sendContactEmail);

module.exports = router;
