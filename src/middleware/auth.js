const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { asyncHandler } = require("./errorHandler");

// Protect routes - verify JWT token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

      // Get user from token
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({
          status: "error",
          message: "User not found. Token is invalid.",
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          status: "error",
          message: "User account is deactivated. contact with admin",
        });
      }

      // Add user to request object
      req.user = {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      next();
    } catch (error) {
      console.error("Token verification error:", error.message);
      
      let message = "Not authorized, token failed";
      
      if (error.name === "TokenExpiredError") {
        message = "Token has expired";
      } else if (error.name === "JsonWebTokenError") {
        message = "Invalid token";
      }

      return res.status(401).json({
        status: "error",
        message,
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Not authorized, no token provided",
    });
  }
});

// Admin role middleware
const adminOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      status: "error",
      message: "Access denied. Admin privileges required.",
    });
  }
});

// Optional authentication - doesn't fail if no token
const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
      const user = await User.findById(decoded.userId);

      if (user && user.isActive) {
        req.user = {
          userId: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        };
      }
    } catch (error) {
      // Silently fail for optional auth
      console.log("Optional auth failed:", error.message);
    }
  }

  next();
});

module.exports = {
  protect,
  adminOnly,
  optionalAuth,
};
