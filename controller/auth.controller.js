import  bcrypt, { hash }  from 'bcryptjs';

import User from '../models/User.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {

        // Validate input
        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please fill all the fields' });
        }  

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Prevent multiple admin registrations
        const adminCount = await User.countDocuments({ role: 'admin' });
        if (role === 'admin' && adminCount > 0) {           
            return res.status(405).json({ success: false, message: 'Method not allowed, Admin already exits' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        // Create a new user
        const user = new  User({
            name,
            email,
            password:hashedPassword,
            role:role || 'user'
        });

        // Save the user to the database
        await user.save();

        // Generate token and set cookie
        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully', 
            user:{
                ...user._doc,
                password:undefined,
            },
        });

    } catch (error) {
        console.error(error).red.bold;
        res.status(500).json({ success:false, message: 'Internal Server Error' });
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please fill all the fields' });
        }
    
        // Check if user exists
        const userExists = await User.findOne({ email });
    
        if (!userExists) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    
        // Check if password is correct
        const isPasswordValid = await bcrypt.compareSync(password,userExists.password);
    
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid Password' });
        }
    
        // Generate token and set cookie
        generateTokenAndSetCookie(res, userExists._id);
    
        res.status(200).json({
            success: true, 
            message: 'User logged in successfully', 
            user: {
                ...userExists._doc,
                password: undefined,
            }
        });
        
    } catch (error) {
        console.error(error).red.bold;
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }



}

export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
}

export const eraseData = async ( req, res) => {
    const { password } = req.body;
}