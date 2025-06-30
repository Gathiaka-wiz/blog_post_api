import colors from 'colors';


export const errorLogger = (req, res, next) => {
    console.log(colors.red.bold(`Error: Route not found - ${req.method} ${req.originalUrl}`));
    // Respond with a 404 status code and a JSON message
    res.status(404).json({ 
        success: false, 
        message: 'Route not found' 
    });
    next();
};

const methodColor = {
    POST: colors.blue.bold,
    DELETE: colors.magenta.bold,
    GET: colors.green.bold,
    PUT: colors.cyan.bold,
    PATCH: colors.magenta.bold,
}

export const routeLogger = (req,res,next) => {
    const colorFn = methodColor[req.method] || ((msg) => msg); // fallback: no color
    console.log(colorFn(`Request Method: ${req.method}, Request URL: ${req.originalUrl}`));
    next();
}