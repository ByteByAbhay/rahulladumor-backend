const Services = require("../models/Services");
const { asyncHandler } = require("../middleware/errorHandler");

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const services = await Services.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    count: services.length,
    data: services,
  });
});

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
const getService = asyncHandler(async (req, res) => {
  const service = await Services.findById(req.params.id);

  if (!service) {
    return res.status(404).json({
      status: "error",
      message: "Service not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: service,
  });
});

// @desc    Create service
// @route   POST /api/services
// @access  Private
const createService = asyncHandler(async (req, res) => {
  const service = await Services.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Service created successfully",
    data: service,
  });
});

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private
const updateService = asyncHandler(async (req, res) => {
  const service = await Services.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    return res.status(404).json({
      status: "error",
      message: "Service not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Service updated successfully",
    data: service,
  });
});

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private
const deleteService = asyncHandler(async (req, res) => {
  const service = await Services.findByIdAndDelete(req.params.id);

  if (!service) {
    return res.status(404).json({
      status: "error",
      message: "Service not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Service deleted successfully",
  });
});

module.exports = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
};
