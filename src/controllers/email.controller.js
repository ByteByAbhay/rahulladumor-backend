const { createTransporter, emailTemplates, adminEmail } = require('../config/email');

/**
 * @swagger
 * components:
 *   schemas:
 *     ContactRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - subject
 *         - message
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *           description: Full name of the person contacting
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *           description: Email address for reply
 *         subject:
 *           type: string
 *           example: Inquiry about AWS consulting services
 *           description: Subject of the message
 *         message:
 *           type: string
 *           example: I would like to discuss your AWS optimization services for my startup.
 *           description: The actual message content
 *         contactMethod:
 *           type: string
 *           enum: [email, phone, whatsapp]
 *           example: email
 *           description: Preferred contact method
 *     ContactResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Email sent successfully
 *         data:
 *           type: object
 *           properties:
 *             userEmailSent:
 *               type: boolean
 *               example: true
 *             adminEmailSent:
 *               type: boolean
 *               example: true
 *             timestamp:
 *               type: string
 *               format: date-time
 *               example: 2023-12-01T10:30:00.000Z
 */

/**
 * Send contact form email
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message, contactMethod, otherSubject } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, email, subject, message'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const contactData = { name, email, subject, message, contactMethod: contactMethod || 'email', otherSubject };
    const transporter = createTransporter();

    // Prepare email templates
    const userEmail = emailTemplates.userConfirmation(contactData);
    const adminEmail = emailTemplates.adminNotification(contactData);

    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'coderninjatech@gmail.com',
      to: email,
      subject: userEmail.subject,
      html: userEmail.html
    };

    // Send notification email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'coderninjatech@gmail.com',
      to: adminEmail.email,
      subject: adminEmail.subject,
      html: adminEmail.html,
      replyTo: email
    };

    // Send both emails
    const [userResult, adminResult] = await Promise.allSettled([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    const userEmailSent = userResult.status === 'fulfilled';
    const adminEmailSent = adminResult.status === 'fulfilled';

    // Log any errors
    if (userResult.status === 'rejected') {
      console.error('Failed to send user email:', userResult.reason);
    }
    if (adminResult.status === 'rejected') {
      console.error('Failed to send admin email:', adminResult.reason);
    }

    // Return response based on results
    if (userEmailSent || adminEmailSent) {
      res.status(200).json({
        success: true,
        message: 'Contact form submitted successfully',
        data: {
          userEmailSent,
          adminEmailSent,
          timestamp: new Date().toISOString()
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send emails. Please try again later.',
        data: {
          userEmailSent: false,
          adminEmailSent: false,
          timestamp: new Date().toISOString()
        }
      });
    }

  } catch (error) {
    console.error('Error in sendContactEmail:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};

module.exports = {
  sendContactEmail
};
