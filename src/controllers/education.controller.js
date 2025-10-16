const Education = require("../models/Education");
const { asyncHandler } = require("../middleware/errorHandler");

// @desc    Get all education records
// @route   GET /api/education
// @access  Public
const getEducation = asyncHandler(async (req, res) => {
  const education = await Education.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    count: education.length,
    data: education,
  });
});

// @desc    Get single education record
// @route   GET /api/education/:id
// @access  Public
const getEducationById = asyncHandler(async (req, res) => {
  const education = await Education.findById(req.params.id);

  if (!education) {
    return res.status(404).json({
      status: "error",
      message: "Education record not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: education,
  });
});

// @desc    Create education record
// @route   POST /api/education
// @access  Private
const createEducation = asyncHandler(async (req, res) => {
  const education = await Education.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Education record created successfully",
    data: education,
  });
});

// @desc    Update education record
// @route   PUT /api/education/:id
// @access  Private
const updateEducation = asyncHandler(async (req, res) => {
  const education = await Education.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!education) {
    return res.status(404).json({
      status: "error",
      message: "Education record not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Education record updated successfully",
    data: education,
  });
});

// @desc    Delete education record
// @route   DELETE /api/education/:id
// @access  Private
const deleteEducation = asyncHandler(async (req, res) => {
  const education = await Education.findByIdAndDelete(req.params.id);

  if (!education) {
    return res.status(404).json({
      status: "error",
      message: "Education record not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Education record deleted successfully",
  });
});

module.exports = {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
};
