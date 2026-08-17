const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

/**
 * Protects admin-only routes.
 * Reads the JWT from the HTTP-only auth cookie (never from
 * localStorage or a header), verifies it, and rejects the request
 * if it is missing, expired, or invalid.
 */
function requireAdminAuth(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return next(new ApiError(401, "Authentication required."));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (payload.role !== "admin") {
      return next(new ApiError(403, "Not authorized."));
    }

    req.admin = { role: payload.role };
    next();
  } catch (error) {
    return next(new ApiError(401, "Session expired or invalid. Please log in again."));
  }
}

module.exports = { requireAdminAuth };
