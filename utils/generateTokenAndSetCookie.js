import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.config.js';

export  const generateTokenAndSetCookie = (res,userId) => {
    const token = jwt.sign({userId},JWT_SECRET,{
        expiresIn:JWT_EXPIRES_IN,
    });


    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:7 * 24 * 60 * 60 * 1000,
    });

    return token;
};