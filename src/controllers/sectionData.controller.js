const SectionData = require("../models/SectionData");
const { asyncHandler } = require("../middleware/errorHandler");

// @desc    Get all section data
// @route   GET /api/section-data
// @access  Public
const getAllSectionData = asyncHandler(async (req, res) => {
  const sectionData = await SectionData.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    count: sectionData.length,
    data: sectionData,
  });
});

// @desc    Get section data by type
// @route   GET /api/section-data/:sectionType
// @access  Public
const getSectionData = asyncHandler(async (req, res) => {
  const sectionData = await SectionData.findOne({
    sectionType: req.params.sectionType,
  });

  if (!sectionData) {
    return res.status(404).json({
      status: "error",
      message: "Section data not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: sectionData,
  });
});

// @desc    Create section data
// @route   POST /api/section-data
// @access  Private
const createSectionData = asyncHandler(async (req, res) => {
  const sectionData = await SectionData.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Section data created successfully",
    data: sectionData,
  });
});

// @desc    Update section data
// @route   PUT /api/section-data/:sectionType
// @access  Private
const updateSectionData = asyncHandler(async (req, res) => {
  const sectionData = await SectionData.findOneAndUpdate(
    { sectionType: req.params.sectionType },
    req.body,
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Section data updated successfully",
    data: sectionData,
  });
});

// @desc    Delete section data
// @route   DELETE /api/section-data/:sectionType
// @access  Private
const deleteSectionData = asyncHandler(async (req, res) => {
  const sectionData = await SectionData.findOneAndDelete({
    sectionType: req.params.sectionType,
  });

  if (!sectionData) {
    return res.status(404).json({
      status: "error",
      message: "Section data not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Section data deleted successfully",
  });
});

module.exports = {
  getAllSectionData,
  getSectionData,
  createSectionData,
  updateSectionData,
  deleteSectionData,
};
