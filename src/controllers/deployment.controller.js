const { asyncHandler } = require("../middleware/errorHandler");

/**
 * @swagger
 * tags:
 *   name: Deployment
 *   description: GitHub Actions deployment management
 */

/**
 * @swagger
 * /api/deployment/trigger:
 *   post:
 *     summary: Trigger GitHub Actions workflow deployment
 *     description: Triggers the GitHub Actions workflow to deploy the frontend application. Requires admin authentication.
 *     tags: [Deployment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               branch:
 *                 type: string
 *                 description: Git branch to deploy (defaults to 'main')
 *                 example: main
 *     responses:
 *       200:
 *         description: Deployment triggered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: 🚀 Deployment triggered successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     branch:
 *                       type: string
 *                       example: main
 *                     workflow:
 *                       type: string
 *                       example: deploy-admin-frontend.yml
 *                     repository:
 *                       type: string
 *                       example: username/repo-name
 *       400:
 *         description: Failed to trigger deployment
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Server error
 */
const triggerDeployment = asyncHandler(async (req, res) => {
  const { branch = "main" } = req.body;

  // Validate required environment variables
  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, WORKFLOW_FILE } = process.env;

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO || !WORKFLOW_FILE) {
    return res.status(500).json({
      status: "error",
      message: "GitHub deployment configuration is missing. Please contact administrator.",
      missingConfig: {
        GITHUB_TOKEN: !GITHUB_TOKEN,
        GITHUB_OWNER: !GITHUB_OWNER,
        GITHUB_REPO: !GITHUB_REPO,
        WORKFLOW_FILE: !WORKFLOW_FILE,
      },
    });
  }

  try {
    // Use native fetch (available in Node.js 18+) or require https module
    const fetch = global.fetch || require("node-fetch");
    
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${WORKFLOW_FILE}/dispatches`;
    
    console.log(`🚀 Triggering deployment for ${GITHUB_OWNER}/${GITHUB_REPO} on branch: ${branch}`);
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        ref: branch,
      }),
    });

    if (response.ok || response.status === 204) {
      console.log(`✅ Deployment triggered successfully by user: ${req.user.username}`);
      
      return res.status(200).json({
        status: "success",
        message: "🚀 Deployment triggered successfully!",
        data: {
          branch,
          workflow: WORKFLOW_FILE,
          repository: `${GITHUB_OWNER}/${GITHUB_REPO}`,
          triggeredBy: req.user.username,
          triggeredAt: new Date().toISOString(),
        },
      });
    } else {
      const errorText = await response.text();
      console.error("❌ GitHub API Error:", errorText);
      
      return res.status(400).json({
        status: "error",
        message: "Failed to trigger deployment",
        error: errorText,
        details: {
          statusCode: response.status,
          statusText: response.statusText,
        },
      });
    }
  } catch (error) {
    console.error("❌ Deployment trigger error:", error.message);
    
    return res.status(500).json({
      status: "error",
      message: "An error occurred while triggering deployment",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/deployment/status:
 *   get:
 *     summary: Get deployment configuration status
 *     description: Check if GitHub deployment is properly configured (admin only)
 *     tags: [Deployment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deployment configuration status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 configured:
 *                   type: boolean
 *                   example: true
 *                 config:
 *                   type: object
 *                   properties:
 *                     hasToken:
 *                       type: boolean
 *                     owner:
 *                       type: string
 *                     repo:
 *                       type: string
 *                     workflow:
 *                       type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
const getDeploymentStatus = asyncHandler(async (req, res) => {
  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, WORKFLOW_FILE } = process.env;

  const isConfigured = !!(GITHUB_TOKEN && GITHUB_OWNER && GITHUB_REPO && WORKFLOW_FILE);

  res.status(200).json({
    status: "success",
    configured: isConfigured,
    config: {
      hasToken: !!GITHUB_TOKEN,
      owner: GITHUB_OWNER || "Not configured",
      repo: GITHUB_REPO || "Not configured",
      workflow: WORKFLOW_FILE || "Not configured",
    },
    message: isConfigured 
      ? "Deployment is properly configured" 
      : "Deployment configuration is incomplete",
  });
});

module.exports = {
  triggerDeployment,
  getDeploymentStatus,
};
