import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { filterXSS } from 'xss';
import generateTokenAndSetCookie from "../utils/generateToken.js";

const getUserResponse = (user, token) => ({
    _id: user._id,
    fullName: user.fullName,
    username: user.username,
    profilePic: user.profilePic,
    token
});

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        
        // Sanitize and normalize
        const sanitizedFullName = filterXSS(fullName.trim());
        const lowerUsername = username.trim().toLowerCase();
        const sanitizedUsername = filterXSS(lowerUsername);

        if (!sanitizedUsername || !password || !sanitizedFullName) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const user = await User.findOne({ username: sanitizedUsername });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12); // Slightly higher salt rounds

        const newUser = await User.create({
            fullName: sanitizedFullName,
            username: sanitizedUsername,
            password: hashedPassword,
            gender,
            profilePic: "/uploads/placeholder.webp"
        });

        const token = generateTokenAndSetCookie(newUser._id, res);
        res.status(201).json(getUserResponse(newUser, token));
    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const normalizedUsername = username.trim().toLowerCase();
        const user = await User.findOne({ username: normalizedUsername });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = generateTokenAndSetCookie(user._id, res);
        res.status(200).json(getUserResponse(user, token));
    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
