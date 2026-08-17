const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

/**
 * Runs after express-validator check(...) chains.
 * Collects validation failures and returns a single, safe 400
 * response instead of letting bad input reach the controller.
 */
function validate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array({ onlyFirstError: true })[0];
    return next(new ApiError(400, firstError.msg));
  }

  next();
}

module.exports = validate;
