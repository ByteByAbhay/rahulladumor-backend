const WorkExperience = require("../models/WorkExperience");
const { asyncHandler } = require("../middleware/errorHandler");

// @desc    Get all work experiences
// @route   GET /api/work-experience
// @access  Public
const getWorkExperiences = asyncHandler(async (req, res) => {
  const workExperiences = await WorkExperience.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    count: workExperiences.length,
    data: workExperiences,
  });
});

// @desc    Get single work experience
// @route   GET /api/work-experience/:id
// @access  Public
const getWorkExperience = asyncHandler(async (req, res) => {
  const workExperience = await WorkExperience.findById(req.params.id);

  if (!workExperience) {
    return res.status(404).json({
      status: "error",
      message: "Work experience not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: workExperience,
  });
});

// @desc    Create work experience
// @route   POST /api/work-experience
// @access  Private
const createWorkExperience = asyncHandler(async (req, res) => {
  const workExperience = await WorkExperience.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Work experience created successfully",
    data: workExperience,
  });
});

// @desc    Update work experience
// @route   PUT /api/work-experience/:id
// @access  Private
const updateWorkExperience = asyncHandler(async (req, res) => {
  const workExperience = await WorkExperience.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!workExperience) {
    return res.status(404).json({
      status: "error",
      message: "Work experience not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Work experience updated successfully",
    data: workExperience,
  });
});

// @desc    Delete work experience
// @route   DELETE /api/work-experience/:id
// @access  Private
const deleteWorkExperience = asyncHandler(async (req, res) => {
  const workExperience = await WorkExperience.findByIdAndDelete(req.params.id);

  if (!workExperience) {
    return res.status(404).json({
      status: "error",
      message: "Work experience not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Work experience deleted successfully",
  });
});

module.exports = {
  getWorkExperiences,
  getWorkExperience,
  createWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
};
