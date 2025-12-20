import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.log("error in user getusersidebar:", error.message);
        res.status(500).json({ error: "internal server error" });
    }
};
