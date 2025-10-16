const nodemailer = require("nodemailer");

// Email configuration
const emailConfig = {
  service: "gmail", // You can change this to your preferred email service
  auth: {
    user: process.env.EMAIL_USER || "coderninjatech@gmail.com",
    pass: process.env.EMAIL_PASS || "nnat egfc xzwz kqty",
  },
};

// Admin email configuration
const adminEmail = process.env.ADMIN_EMAIL || "coderninjatech@gmail.com";

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport(emailConfig);
};

// Helper functions for email templates
const getContactMethodLabel = (method) => {
  const methodMap = {
    email: "Email",
    phone: "Phone Call",
    whatsapp: "WhatsApp",
  };
  return methodMap[method] || "Email";
};

const getSubjectLabel = (subject) => {
  const subjectMap = {
    "aws-consulting": "AWS Consulting Services",
    "cost-optimization": "Cost Optimization",
    mentorship: "Career Mentorship",
    "enterprise-consulting": "Enterprise Consulting",
    "speaking-engagement": "Speaking Engagement",
    partnership: "Partnership Opportunity",
  };
  return subjectMap[subject] || subject;
};

const getPriorityLevel = (subject) => {
  const priorityMap = {
    "aws-consulting": "High",
    "cost-optimization": "High",
    "enterprise-consulting": "High",
    mentorship: "Medium",
    "speaking-engagement": "Medium",
    partnership: "Medium",
    other: "Low",
  };
  return priorityMap[subject] || "Medium";
};

const getPriorityClass = (subject) => {
  const classMap = {
    "aws-consulting": "priority-high",
    "cost-optimization": "priority-high",
    "enterprise-consulting": "priority-high",
    mentorship: "priority-medium",
    "speaking-engagement": "priority-medium",
    partnership: "priority-medium",
    other: "priority-low",
  };
  return classMap[subject] || "priority-medium";
};

// Email templates
const emailTemplates = {
  // Template for user confirmation email
  userConfirmation: (data) => ({
    subject: `Thank you for contacting us, ${data.name}!`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You - Contact Confirmation</title>
          <style>
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }
              
              body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                  line-height: 1.6;
                  color: #2D3748;
                  background-color: #F7FAFC;
              }
              
              .email-container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #FFFFFF;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              
              .header {
                  background: linear-gradient(135deg, #38A169 0%, #48BB78 100%);
                  color: #FFFFFF;
                  padding: 32px 24px;
                  text-align: center;
              }
              
              .header h1 {
                  font-size: 24px;
                  font-weight: 700;
                  margin-bottom: 8px;
              }
              
              .header p {
                  font-size: 16px;
                  opacity: 0.9;
              }
              
              .content {
                  padding: 32px 24px;
              }
              
              .section {
                  margin-bottom: 32px;
              }
              
              .section h2 {
                  color: #1B365D;
                  font-size: 18px;
                  font-weight: 600;
                  margin-bottom: 16px;
                  border-bottom: 2px solid #E2E8F0;
                  padding-bottom: 8px;
              }
              
              .message-box {
                  background-color: #F7FAFC;
                  border: 1px solid #E2E8F0;
                  border-radius: 8px;
                  padding: 20px;
                  margin: 16px 0;
              }
              
              .message-text {
                  font-size: 15px;
                  line-height: 1.7;
                  color: #4A5568;
                  white-space: pre-wrap;
              }
              
              .footer {
                  background-color: #F7FAFC;
                  padding: 24px;
                  text-align: center;
                  border-top: 1px solid #E2E8F0;
              }
              
              .footer-text {
                  font-size: 14px;
                  color: #718096;
                  margin-bottom: 16px;
              }
              
              .timestamp {
                  font-size: 12px;
                  color: #A0AEC0;
                  text-align: right;
                  margin-top: 16px;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="header">
                  <h1>Thank You for Reaching Out!</h1>
                  <p>Your message has been received</p>
              </div>
              
              <div class="content">
                  <div class="section">
                      <p>Dear ${data.name},</p>
                      <p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>
                  </div>
                  
                  <div class="section">
                      <h2>Your Message Summary</h2>
                      <p><strong>Subject:</strong> ${
                        data.subject !== "other"
                          ? data.subject
                          : data.otherSubject
                      }</p>
                      <p><strong>Preferred Contact Method:</strong> ${getContactMethodLabel(
                        data.contactMethod
                      )}</p>
                      <div class="message-box">
                          <div class="message-text">${data.message}</div>
                      </div>
                  </div>
                  
                  <div class="section">
                      <p>We typically respond within 24 hours. If you have any urgent questions, please don't hesitate to reach out directly.</p>
                  </div>
                  
                  <div class="timestamp">
                      Received: ${new Date().toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        dateStyle: "full",
                        timeStyle: "medium",
                      })}
                  </div>
              </div>
              
              <div class="footer">
                  <div class="footer-text">
                      <strong>Rahul Ladumor</strong><br>
                      3x AWS Certified Full-Stack JavaScript & Cloud Engineer<br>
                      Email: contact@acloudwithrahul.in<br>
                      Website: https://www.rahulladumor.in
                  </div>
              </div>
          </div>
      </body>
      </html>
    `,
  }),

  // Template for admin notification email
  adminNotification: (data) => ({
    subject: `New Contact Form Submission: ${
      data.subject !== "other" ? data.subject : data.otherSubject
    }`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }
              
              body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                  line-height: 1.6;
                  color: #2D3748;
                  background-color: #F7FAFC;
              }
              
              .email-container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #FFFFFF;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              
              .header {
                  background: linear-gradient(135deg, #1B365D 0%, #2D5A87 100%);
                  color: #FFFFFF;
                  padding: 32px 24px;
                  text-align: center;
              }
              
              .header h1 {
                  font-size: 24px;
                  font-weight: 700;
                  margin-bottom: 8px;
              }
              
              .header p {
                  font-size: 16px;
                  opacity: 0.9;
              }
              
              .content {
                  padding: 32px 24px;
              }
              
              .section {
                  margin-bottom: 32px;
              }
              
              .section h2 {
                  color: #1B365D;
                  font-size: 18px;
                  font-weight: 600;
                  margin-bottom: 16px;
                  border-bottom: 2px solid #E2E8F0;
                  padding-bottom: 8px;
              }
              
              .info-grid {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 16px;
                  margin-bottom: 24px;
              }
              
              .info-item {
                  background-color: #F7FAFC;
                  padding: 16px;
                  border-radius: 8px;
                  border-left: 4px solid #FF8C42;
              }
              
              .info-label {
                  font-size: 12px;
                  font-weight: 600;
                  color: #718096;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  margin-bottom: 4px;
              }
              
              .info-value {
                  font-size: 16px;
                  font-weight: 500;
                  color: #2D3748;
              }
              
              .message-box {
                  background-color: #F7FAFC;
                  border: 1px solid #E2E8F0;
                  border-radius: 8px;
                  padding: 20px;
                  margin: 16px 0;
              }
              
              .message-text {
                  font-size: 15px;
                  line-height: 1.7;
                  color: #4A5568;
                  white-space: pre-wrap;
              }
              
              .priority-badge {
                  display: inline-block;
                  padding: 4px 12px;
                  border-radius: 20px;
                  font-size: 12px;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
              }
              
              .priority-high {
                  background-color: #FED7D7;
                  color: #C53030;
              }
              
              .priority-medium {
                  background-color: #FEEBC8;
                  color: #DD6B20;
              }
              
              .priority-low {
                  background-color: #C6F6D5;
                  color: #38A169;
              }
              
              .action-buttons {
                  display: flex;
                  gap: 12px;
                  margin-top: 24px;
                  flex-wrap: wrap;
              }
              
              .btn {
                  display: inline-block;
                  padding: 12px 24px;
                  border-radius: 8px;
                  text-decoration: none;
                  font-weight: 600;
                  font-size: 14px;
                  text-align: center;
                  transition: all 0.2s ease;
              }
              
              .btn-primary {
                  background-color: #FF8C42;
                  color: #FFFFFF;
              }
              
              .btn-secondary {
                  background-color: #E2E8F0;
                  color: #4A5568;
              }
              
              .timestamp {
                  font-size: 12px;
                  color: #A0AEC0;
                  text-align: right;
                  margin-top: 16px;
              }
              
              @media (max-width: 600px) {
                  .info-grid {
                      grid-template-columns: 1fr;
                  }
                  
                  .action-buttons {
                      flex-direction: column;
                  }
                  
                  .btn {
                      width: 100%;
                  }
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="header">
                  <h1>New Contact Form Submission</h1>
                  <p>AWS Cloud Consulting & Mentorship</p>
              </div>
              
              <div class="content">
                  <div class="section">
                      <h2>Contact Information</h2>
                      <div class="info-grid">
                          <div class="info-item">
                              <div class="info-label">Full Name</div>
                              <div class="info-value">${data.name}</div>
                          </div>
                          <div class="info-item">
                              <div class="info-label">Email Address</div>
                              <div class="info-value">${data.email}</div>
                          </div>
                          <div class="info-item">
                              <div class="info-label">Subject</div>
                              <div class="info-value">${
                                data.subject !== "other"
                                  ? data.subject
                                  : data.otherSubject
                              }</div>
                          </div>
                          <div class="info-item">
                              <div class="info-label">Preferred Contact Method</div>
                              <div class="info-value">${getContactMethodLabel(
                                data.contactMethod
                              )}</div>
                          </div>
                      </div>
                      
                      <div style="margin-top: 16px;">
                          <span class="priority-badge ${getPriorityClass(
                            data.subject
                          )}">
                              ${getPriorityLevel(data.subject)} Priority
                          </span>
                      </div>
                  </div>
                  
                  <div class="section">
                      <h2>Message</h2>
                      <div class="message-box">
                          <div class="message-text">${data.message}</div>
                      </div>
                  </div>
                  
                  <div class="action-buttons">
                      <a href="mailto:${data.email}?subject=Re: ${
      data.subject !== "other" ? data.subject : data.otherSubject
    }" class="btn btn-primary">
                          Reply to ${data.name}
                      </a>
                      <a href="mailto:${data.email}" class="btn btn-secondary">
                          Send New Email
                      </a>
                  </div>
                  
                  <div class="timestamp">
                      Received: ${new Date().toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        dateStyle: "full",
                        timeStyle: "medium",
                      })}
                  </div>
              </div>
          </div>
      </body>
      </html>
    `,
    email: adminEmail,
  }),
};

module.exports = {
  createTransporter,
  emailTemplates,
  adminEmail,
  getContactMethodLabel,
  getSubjectLabel,
  getPriorityLevel,
  getPriorityClass,
};
