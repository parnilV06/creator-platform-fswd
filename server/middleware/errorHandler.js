const errorHandler = (err, req, res, next) => {
  console.error('Unhandled error:', err);

  let statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);
  let message = err.message || 'Internal Server Error';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    const validationMessages = Object.values(err.errors || {}).map((fieldError) => fieldError.message);
    message = validationMessages[0] || 'Validation failed';
  }

  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Not authorized';
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
