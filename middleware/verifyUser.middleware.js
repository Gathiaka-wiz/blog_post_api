export const verifyUser = (req, res, next) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access, please login"
        });
    }

    // If userId is present, proceed to the next middleware or route handler
    next();

}