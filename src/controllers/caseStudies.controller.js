const CaseStudies = require("../models/CaseStudies");
const { asyncHandler } = require("../middleware/errorHandler");

// @desc    Get all case studies
// @route   GET /api/case-studies
// @access  Public
const getCaseStudies = asyncHandler(async (req, res) => {
  const caseStudies = await CaseStudies.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    count: caseStudies.length,
    data: caseStudies,
  });
});

// @desc    Get single case study
// @route   GET /api/case-studies/:id
// @access  Public
const getCaseStudy = asyncHandler(async (req, res) => {
  const caseStudy = await CaseStudies.findById(req.params.id);

  if (!caseStudy) {
    return res.status(404).json({
      status: "error",
      message: "Case study not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: caseStudy,
  });
});

// @desc    Create case study
// @route   POST /api/case-studies
// @access  Private
const createCaseStudy = asyncHandler(async (req, res) => {
  const caseStudy = await CaseStudies.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Case study created successfully",
    data: caseStudy,
  });
});

// @desc    Update case study
// @route   PUT /api/case-studies/:id
// @access  Private
const updateCaseStudy = asyncHandler(async (req, res) => {
  const caseStudy = await CaseStudies.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!caseStudy) {
    return res.status(404).json({
      status: "error",
      message: "Case study not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Case study updated successfully",
    data: caseStudy,
  });
});

// @desc    Delete case study
// @route   DELETE /api/case-studies/:id
// @access  Private
const deleteCaseStudy = asyncHandler(async (req, res) => {
  const caseStudy = await CaseStudies.findByIdAndDelete(req.params.id);

  if (!caseStudy) {
    return res.status(404).json({
      status: "error",
      message: "Case study not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Case study deleted successfully",
  });
});

module.exports = {
  getCaseStudies,
  getCaseStudy,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
};
