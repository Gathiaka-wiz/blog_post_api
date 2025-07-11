import jwt, { decode } from 'jsonwebtoken';
import colors from 'colors';

// import { User } from '../models/User.js';
import { JWT_SECRET } from '../config/env.config.js';

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    try {
        
        if (!token) res.status(401).json({ success: false, message: 'No token provided, authorization denied' });

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId

        next();

    } catch (error) {
        console.error("Error in verifyToken middleware:", error).red.bold;
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
        next();
    }
}

export default verifyToken;