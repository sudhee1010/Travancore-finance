const Enquiry = require("../models/Enquiry");
const asyncHandler = require("../utils/asyncHandler");

/**
 * POST /api/enquiries  (public)
 *
 * Field-level validation/sanitization happens in validationMiddleware
 * (see routes/enquiryRoutes.js) before this handler ever runs.
 */
const createEnquiry = asyncHandler(async (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  const enquiry = await Enquiry.create({ name, phone, email, subject, message });

  // Return only what the frontend needs — never the full raw document.
  res.status(201).json({
    success: true,
    message: "Your enquiry has been submitted. We will get back to you soon.",
    data: {
      id: enquiry._id,
      createdAt: enquiry.createdAt,
    },
  });
});

/**
 * GET /api/admin/enquiries  (admin only, requireAdminAuth applied in route)
 */
const getEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: enquiries.length,
    data: enquiries,
  });
});

module.exports = { createEnquiry, getEnquiries };
