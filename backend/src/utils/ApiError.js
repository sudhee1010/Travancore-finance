/**
 * Small typed error for expected/operational failures
 * (validation, auth, not found, etc.) so the central error handler
 * can respond with the right status code and a safe message.
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

module.exports = ApiError;
