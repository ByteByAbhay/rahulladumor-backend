const mongoose = require("mongoose");
const User = require("../src/models/User");
require("dotenv").config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME || "rahulladumor_portfolio",
    });

    console.log("Connected to MongoDB");

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    
    if (existingAdmin) {
      console.log("Admin user already exists:");
      console.log(`Username: ${existingAdmin.username}`);
      console.log(`Email: ${existingAdmin.email}`);
      console.log("Use this account to login or create a new admin user with different credentials.");
      return;
    }

    // Create default admin user
    const adminData = {
      username: "admin",
      email: "admin@acloudwithrahul.in",
      password: "RahulLadumor@1233", // This will be hashed automatically
      role: "admin",
    };

    const adminUser = await User.create(adminData);

    console.log("✅ Admin user created successfully!");
    console.log("Login credentials:");
    console.log(`Username: ${adminUser.username}`);
    console.log(`Email: ${adminUser.email}`);
    console.log("Password: admin123");
    console.log("\n⚠️  IMPORTANT: Change the default password after first login!");
    console.log("Use POST /api/auth/login to authenticate");
    console.log("Use PUT /api/auth/change-password to change password");

  } catch (error) {
    console.error("Error creating admin user:", error.message);
    
    if (error.code === 11000) {
      console.log("User with this email or username already exists.");
      console.log("Try using different credentials or check existing users.");
    }
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
};

// Run the script
createAdminUser();
