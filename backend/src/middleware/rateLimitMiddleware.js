const rateLimit = require("express-rate-limit");

/**
 * General API rate limit — applied globally to /api.
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again later." },
});

/**
 * Stricter limit for the public enquiry endpoint to deter spam/abuse.
 */
const enquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many enquiries submitted. Please try again later." },
});

/**
 * Strict limit + slow-down-by-lockout for the admin login endpoint,
 * to protect against brute-force password guessing.
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts. Please try again later." },
  skipSuccessfulRequests: true,
});

module.exports = { apiLimiter, enquiryLimiter, loginLimiter };
