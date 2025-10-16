const Skills = require("../models/Skills");
const { asyncHandler } = require("../middleware/errorHandler");

// @desc    Get skills
// @route   GET /api/skills
// @access  Public
const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skills.findOne().sort({ createdAt: -1 });

  if (!skills) {
    return res.status(404).json({
      status: "error",
      message: "Skills not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: skills,
  });
});

// @desc    Create skills
// @route   POST /api/skills
// @access  Private
const createSkills = asyncHandler(async (req, res) => {
  const skills = await Skills.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Skills created successfully",
    data: skills,
  });
});

// @desc    Update skills
// @route   PUT /api/skills/:id
// @access  Private
const updateSkills = asyncHandler(async (req, res) => {
  const skills = await Skills.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!skills) {
    return res.status(404).json({
      status: "error",
      message: "Skills not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Skills updated successfully",
    data: skills,
  });
});

// @desc    Delete skills
// @route   DELETE /api/skills/:id
// @access  Private
const deleteSkills = asyncHandler(async (req, res) => {
  const skills = await Skills.findByIdAndDelete(req.params.id);

  if (!skills) {
    return res.status(404).json({
      status: "error",
      message: "Skills not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Skills deleted successfully",
  });
});

module.exports = {
  getSkills,
  createSkills,
  updateSkills,
  deleteSkills,
};
