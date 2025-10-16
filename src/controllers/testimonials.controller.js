const Testimonials = require("../models/Testimonials");
const { asyncHandler } = require("../middleware/errorHandler");

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonials.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    count: testimonials.length,
    data: testimonials,
  });
});

// @desc    Get single testimonial
// @route   GET /api/testimonials/:id
// @access  Public
const getTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonials.findById(req.params.id);

  if (!testimonial) {
    return res.status(404).json({
      status: "error",
      message: "Testimonial not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: testimonial,
  });
});

// @desc    Create testimonial
// @route   POST /api/testimonials
// @access  Private
const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonials.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Testimonial created successfully",
    data: testimonial,
  });
});

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private
const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonials.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!testimonial) {
    return res.status(404).json({
      status: "error",
      message: "Testimonial not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Testimonial updated successfully",
    data: testimonial,
  });
});

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private
const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonials.findByIdAndDelete(req.params.id);

  if (!testimonial) {
    return res.status(404).json({
      status: "error",
      message: "Testimonial not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Testimonial deleted successfully",
  });
});

module.exports = {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
