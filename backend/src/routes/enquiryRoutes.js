const express = require("express");
const { body } = require("express-validator");
const { createEnquiry } = require("../controllers/enquiryController");
const validate = require("../middleware/validationMiddleware");
const { enquiryLimiter } = require("../middleware/rateLimitMiddleware");

const router = express.Router();

router.post(
  "/",
  enquiryLimiter,
  [
    body("name").trim().notEmpty().withMessage("Name is required.")
      .isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters."),
    body("phone").trim().notEmpty().withMessage("Phone number is required.")
      .matches(/^[0-9+\-\s()]{7,20}$/).withMessage("Please provide a valid phone number."),
    body("email").trim().notEmpty().withMessage("Email is required.")
      .isEmail().withMessage("Please provide a valid email address.")
      .normalizeEmail(),
    body("subject").trim().notEmpty().withMessage("Subject is required.")
      .isLength({ max: 150 }).withMessage("Subject must be at most 150 characters."),
    body("message").trim().notEmpty().withMessage("Message is required.")
      .isLength({ min: 10, max: 2000 }).withMessage("Message must be between 10 and 2000 characters."),
  ],
  validate,
  createEnquiry
);

module.exports = router;
