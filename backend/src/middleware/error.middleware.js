const ApiError = require('../utils/ApiError');
const errorHandler = (err, _req, res, _next) => {
  let error = err;


  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message);
    // Preserve original stack trace
    if (err.stack) {
      error.stack = err.stack;
    }
  }

  res.status(error.statusCode).json({
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

module.exports = { errorHandler };
