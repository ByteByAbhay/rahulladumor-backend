const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { asyncHandler } = require("../middleware/errorHandler");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    return res.status(400).json({
      status: "error",
      message: existingUser.email === email 
        ? "User with this email already exists" 
        : "User with this username already exists",
    });
  }

  // Create user
  const user = await User.create({
    username,
    email,
    isActive: false,
    password,
    role: role || "user", // Default to 'user' if no role specified
  });

  // Generate token
  const token = generateToken(user._id);

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: {
      user: user.toPublicJSON(),
      token,
    },
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body; // identifier can be email or username

  if (!identifier || !password) {
    return res.status(400).json({
      status: "error",
      message: "Please provide email/username and password",
    });
  }

  // Find user by email or username and include password
  const user = await User.findByEmailOrUsername(identifier);

  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "Invalid credentials",
    });
  }

  // Check if user is active
  if (!user.isActive) {
    return res.status(401).json({
      status: "error",
      message: "Account is deactivated. Please contact administrator.",
    });
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(401).json({
      status: "error",
      message: "Invalid credentials",
    });
  }

  // Generate token
  const token = generateToken(user._id);

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Login successful",
    data: {
      user: user.toPublicJSON(),
      token,
    },
  });
});

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId);

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "User profile retrieved successfully",
    data: {
      user: user.toPublicJSON(),
    },
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
const updateMe = asyncHandler(async (req, res) => {
  const { username, email } = req.body;
  
  const user = await User.findById(req.user.userId);

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  // Check if email or username is already taken by another user
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email, _id: { $ne: user._id } });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Email is already taken",
      });
    }
  }

  if (username && username !== user.username) {
    const existingUser = await User.findOne({ username, _id: { $ne: user._id } });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Username is already taken",
      });
    }
  }

  // Update user
  if (username) user.username = username;
  if (email) user.email = email;

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Profile updated successfully",
    data: {
      user: user.toPublicJSON(),
    },
  });
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      status: "error",
      message: "Please provide current password and new password",
    });
  }

  // Find user with password
  const user = await User.findById(req.user.userId).select("+password");

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  // Check current password
  const isCurrentPasswordValid = await user.comparePassword(currentPassword);

  if (!isCurrentPasswordValid) {
    return res.status(400).json({
      status: "error",
      message: "Current password is incorrect",
    });
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password changed successfully",
  });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  // In a stateless JWT system, logout is handled client-side by removing the token
  // However, we can provide a logout endpoint for consistency and future token blacklisting
  
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
    data: {
      instructions: "Please remove the JWT token from your client storage (localStorage, sessionStorage, etc.)"
    }
  });
});

// @desc    Get all users (Admin only)
// @route   GET /api/auth/users
// @access  Private (Admin)
const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments();

  res.status(200).json({
    status: "success",
    message: "Users retrieved successfully",
    data: {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
});

// @desc    Update user status (Admin only)
// @route   PUT /api/auth/users/:id/status
// @access  Private (Admin)
const updateUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  if (typeof isActive !== 'boolean') {
    return res.status(400).json({
      status: "error",
      message: "isActive must be a boolean value (true or false)",
    });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  // Prevent admin from deactivating themselves
  if (user._id.toString() === req.user.userId && !isActive) {
    return res.status(400).json({
      status: "error",
      message: "You cannot deactivate your own account",
    });
  }

  const previousStatus = user.isActive;
  user.isActive = isActive;
  await user.save();

  res.status(200).json({
    status: "success",
    message: `User ${isActive ? "activated" : "deactivated"} successfully`,
    data: {
      user: user.toPublicJSON(),
      previousStatus,
      currentStatus: isActive,
    },
  });
});

// @desc    Activate user account
// @route   PUT /api/auth/users/:id/activate
// @access  Private (Admin)
const activateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  if (user.isActive) {
    return res.status(400).json({
      status: "error",
      message: "User is already active",
    });
  }

  user.isActive = true;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "User activated successfully",
    data: {
      user: user.toPublicJSON(),
    },
  });
});

// @desc    Deactivate user account
// @route   PUT /api/auth/users/:id/deactivate
// @access  Private (Admin)
const deactivateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  // Prevent admin from deactivating themselves
  if (user._id.toString() === req.user.userId) {
    return res.status(400).json({
      status: "error",
      message: "You cannot deactivate your own account",
    });
  }

  if (!user.isActive) {
    return res.status(400).json({
      status: "error",
      message: "User is already inactive",
    });
  }

  user.isActive = false;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "User deactivated successfully",
    data: {
      user: user.toPublicJSON(),
    },
  });
});

// @desc    Get pending users (inactive users)
// @route   GET /api/auth/users/pending
// @access  Private (Admin)
const getPendingUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find({ isActive: false })
    .select("-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments({ isActive: false });

  res.status(200).json({
    status: "success",
    message: "Pending users retrieved successfully",
    data: {
      users: users.map(user => user.toPublicJSON()),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    },
  });
});

module.exports = {
  register,
  login,
  logout,
  getMe,
  updateMe,
  changePassword,
  getAllUsers,
  updateUserStatus,
  activateUser,
  deactivateUser,
  getPendingUsers,
};
