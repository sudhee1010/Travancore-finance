const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const parseDurationToMs = require("../utils/parseDuration");

const COOKIE_NAME = "token";

function getCookieOptions() {
  const maxAge = parseDurationToMs(process.env.AUTH_SESSION_EXPIRY, 60 * 60 * 1000);

  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge,
    path: "/",
  };
}

/**
 * POST /api/auth/login
 *
 * Verifies the submitted password against ADMIN_PASSWORD_HASH and, on
 * success, issues a short-lived JWT in an HTTP-only cookie. The
 * password itself is never logged, stored, or echoed back.
 */
const login = asyncHandler(async (req, res, next) => {
  const { password } = req.body;

  if (typeof password !== "string" || password.length === 0) {
    // Generic message — do not reveal which part of the request was wrong.
    return next(new ApiError(401, "Invalid credentials."));
  }

  const storedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!storedHash || storedHash === "admin@234") {
    // Server misconfiguration — do not leak this detail to the client.
    console.error("ADMIN_PASSWORD_HASH is not configured.");
    return next(new ApiError(500, "An error occurred. Please try again later."));
  }

  const isMatch = await bcrypt.compare(password, storedHash);

  if (!isMatch) {
    return next(new ApiError(401, "Invalid credentials."));
  }

  const expiresIn = process.env.AUTH_SESSION_EXPIRY || "1h";
  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn });

  res.cookie(COOKIE_NAME, token, getCookieOptions());

  res.status(200).json({
    success: true,
    message: "Logged in successfully.",
  });
});

/**
 * POST /api/auth/logout
 * Clears the auth cookie so the session can no longer be used.
 */
const logout = asyncHandler(async (req, res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
});

module.exports = { login, logout };
