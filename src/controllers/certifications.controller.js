const Certifications = require("../models/Certifications");
const { asyncHandler } = require("../middleware/errorHandler");

// @desc    Get all certifications
// @route   GET /api/certifications
// @access  Public
const getCertifications = asyncHandler(async (req, res) => {
  const certifications = await Certifications.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    count: certifications.length,
    data: certifications,
  });
});

// @desc    Get single certification
// @route   GET /api/certifications/:id
// @access  Public
const getCertification = asyncHandler(async (req, res) => {
  const certification = await Certifications.findById(req.params.id);

  if (!certification) {
    return res.status(404).json({
      status: "error",
      message: "Certification not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: certification,
  });
});

// @desc    Create certification
// @route   POST /api/certifications
// @access  Private
const createCertification = asyncHandler(async (req, res) => {
  const certification = await Certifications.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Certification created successfully",
    data: certification,
  });
});

// @desc    Update certification
// @route   PUT /api/certifications/:id
// @access  Private
const updateCertification = asyncHandler(async (req, res) => {
  const certification = await Certifications.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!certification) {
    return res.status(404).json({
      status: "error",
      message: "Certification not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Certification updated successfully",
    data: certification,
  });
});

// @desc    Delete certification
// @route   DELETE /api/certifications/:id
// @access  Private
const deleteCertification = asyncHandler(async (req, res) => {
  const certification = await Certifications.findByIdAndDelete(req.params.id);

  if (!certification) {
    return res.status(404).json({
      status: "error",
      message: "Certification not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Certification deleted successfully",
  });
});

module.exports = {
  getCertifications,
  getCertification,
  createCertification,
  updateCertification,
  deleteCertification,
};
