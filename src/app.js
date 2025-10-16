const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/database");
const { swaggerUi, specs } = require("./config/swagger");
const { errorHandler } = require("./middleware/errorHandler");

// Connect to MongoDB
connectDB();

// Import routes
const healthRoutes = require("./routes/health.routes");
const profileRoutes = require("./routes/profile.routes");
const emailRoutes = require("./routes/email.routes");
const authRoutes = require("./routes/auth.routes");

// Import new MongoDB-based routes
const personalInfoRoutes = require("./routes/personalInfo.routes");
const skillsRoutes = require("./routes/skills.routes");
const certificationsRoutes = require("./routes/certifications.routes");
const servicesRoutes = require("./routes/services.routes");
const workExperienceRoutes = require("./routes/workExperience.routes");
const testimonialsRoutes = require("./routes/testimonials.routes");
const caseStudiesRoutes = require("./routes/caseStudies.routes");
const sectionDataRoutes = require("./routes/sectionData.routes");
const additionalInfoRoutes = require("./routes/additionalInfo.routes");
const educationRoutes = require("./routes/education.routes");
const bulkUpdateRoutes = require("./routes/bulkUpdate.routes");
const articlesRoutes = require("./routes/articles.routes");

const app = express();

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const CORS_ORIGIN = process.env.CORS_ORIGIN;
    if (CORS_ORIGIN) {
      const allowedOrigins = CORS_ORIGIN.split(",");
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
    }
    // List of allowed origins
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "https://rahulladumor-backend.onrender.com",
      // Add your frontend URLs here
    ];

    // Allow any origin in development
    if (process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }

    // Check if the origin is allowed
    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      origin.includes(".onrender.com")
    ) {
      callback(null, true);
    } else {
      // In production, allow all origins but log unknown ones
      console.log("Request from origin:", origin);
      callback(null, true); // Allow all for now to prevent CORS issues
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  exposedHeaders: ["X-Total-Count", "Content-Range"],
  maxAge: 86400, // 24 hours
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve static files from public directory
app.use("/public", express.static("public"));

// Swagger documentation with custom options
const swaggerUiOptions = {
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .auth-wrapper { margin-bottom: 20px; }
    .swagger-ui .auth-container .auth-btn-wrapper { margin-top: 10px; }
  `,
  customSiteTitle: "Rahul Ladumor Portfolio API Documentation",
  customJs: "/public/swagger-custom.js",
  swaggerOptions: {
    persistAuthorization: true,
    tryItOutEnabled: true,
    supportedSubmitMethods: [
      "get",
      "put",
      "post",
      "delete",
      "options",
      "head",
      "patch",
      "trace",
    ],
    onComplete: function () {
      // This will be overridden by our custom JS
    },
  },
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

// ========================================
// API Routes Configuration
// ========================================
// All routes are registered under /api prefix
// To add a new route: Add entry to routes array below
const routes = [
  // Authentication & Authorization
  { path: "/auth", router: authRoutes },

  // Core Routes
  { path: "/", router: healthRoutes, name: "health" }, // /api/health
  { path: "/", router: profileRoutes, name: "profile" }, // /api/profile
  { path: "/", router: emailRoutes, name: "email" }, // /api/contact

  // Portfolio Data Routes
  { path: "/personal-info", router: personalInfoRoutes, name: "personal-info" },
  { path: "/skills", router: skillsRoutes },
  { path: "/certifications", router: certificationsRoutes },
  { path: "/services", router: servicesRoutes },
  { path: "/work-experience", router: workExperienceRoutes },
  { path: "/testimonials", router: testimonialsRoutes },
  { path: "/case-studies", router: caseStudiesRoutes },
  { path: "/education", router: educationRoutes },
  { path: "/articles", router: articlesRoutes },

  // Utility Routes
  { path: "/section-data", router: sectionDataRoutes },
  { path: "/additional-info", router: additionalInfoRoutes },
  { path: "/bulk-update", router: bulkUpdateRoutes },
];

// Register all routes under /api prefix
const apiRouter = express.Router();
routes.forEach(({ path, router, name }) => {
  apiRouter.use(path, router);
  console.log(`✓ Registered route: /api${name ? `/${name}` : path}`);
});

const API_PREFIX = process.env.API_PREFIX;
// Mount all API routes under /api
app.use(API_PREFIX || "/api", apiRouter);

// Root endpoint
app.get("/", (req, res) => {
  // Generate endpoints list from routes
  const endpoints = routes.reduce((acc, { path }) => {
    const routeName = path.replace(/^\//, "").replace(/-/g, "") || "root";
    acc[routeName] = `/api${path}`;
    return acc;
  }, {});

  res.json({
    message: "Welcome to Rahul Ladumor Portfolio API",
    documentation: "/api-docs",
    version: "2.0.0",
    status: "active",
    totalRoutes: routes.length,
    endpoints: {
      // Documentation
      swagger: "/api-docs",
      authDemo: "/public/auth-demo.html",
      // API Routes
      ...endpoints,
    },
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
