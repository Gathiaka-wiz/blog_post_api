const ErrorHandler = (err, req, res, next) => {
    // Set default status code and message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Log error for debugging
    console.error(err);

    res.status(statusCode).json({
        success: false,
        error: message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
};

export default ErrorHandler;