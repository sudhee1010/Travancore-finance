const express = require("express");
const { body } = require("express-validator");
const { login, logout } = require("../controllers/authController");
const validate = require("../middleware/validationMiddleware");
const { loginLimiter } = require("../middleware/rateLimitMiddleware");

const router = express.Router();

router.post(
  "/login",
  loginLimiter,
  [body("password").isString().notEmpty().withMessage("Password is required.")],
  validate,
  login
);

router.post("/logout", logout);

module.exports = router;
