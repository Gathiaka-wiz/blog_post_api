import User from "../models/User.model.js";


export const isAdmin = async (req, res, next) => {
    try {
        const  id  = req.userId;
        const notAdmin = await User.findById(id);

        console.log(notAdmin.role);
        if (notAdmin.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admins only."
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
        next();
    }
}