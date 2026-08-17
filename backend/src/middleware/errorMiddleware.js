const ApiError = require("../utils/ApiError");

/**
 * 404 handler for unmatched routes.
 */
function notFound(req, res, next) {
  next(new ApiError(404, "Resource not found."));
}

/**
 * Centralized error handler.
 * Never leaks stack traces, DB details, env vars, or internal paths
 * to the client. Full details are logged server-side only, and only
 * in non-production environments.
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  const statusCode = err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;
  const isOperational = err.isOperational === true;

  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  } else if (!isOperational) {
    // Unexpected errors still get logged server-side in production,
    // just without exposing internals to the client.
    console.error("Unhandled error:", err.message);
  }

  const message = isOperational ? err.message : "An error occurred. Please try again later.";

  res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = { notFound, errorHandler };
