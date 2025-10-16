const PersonalInfo = require("../models/PersonalInfo");
const { asyncHandler } = require("../middleware/errorHandler");

// @desc    Get personal information
// @route   GET /api/personal-info
// @access  Public
const getPersonalInfo = asyncHandler(async (req, res) => {
  const personalInfo = await PersonalInfo.findOne().sort({ createdAt: -1 });

  if (!personalInfo) {
    return res.status(404).json({
      status: "error",
      message: "Personal information not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: personalInfo,
  });
});

// @desc    Create personal information
// @route   POST /api/personal-info
// @access  Private
const createPersonalInfo = asyncHandler(async (req, res) => {
  const personalInfo = await PersonalInfo.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Personal information created successfully",
    data: personalInfo,
  });
});

// @desc    Update personal information
// @route   PUT /api/personal-info/:id
// @access  Private
const updatePersonalInfo = asyncHandler(async (req, res) => {
  const personalInfo = await PersonalInfo.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!personalInfo) {
    return res.status(404).json({
      status: "error",
      message: "Personal information not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Personal information updated successfully",
    data: personalInfo,
  });
});

// @desc    Delete personal information
// @route   DELETE /api/personal-info/:id
// @access  Private
const deletePersonalInfo = asyncHandler(async (req, res) => {
  const personalInfo = await PersonalInfo.findByIdAndDelete(req.params.id);

  if (!personalInfo) {
    return res.status(404).json({
      status: "error",
      message: "Personal information not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Personal information deleted successfully",
  });
});

module.exports = {
  getPersonalInfo,
  createPersonalInfo,
  updatePersonalInfo,
  deletePersonalInfo,
};
