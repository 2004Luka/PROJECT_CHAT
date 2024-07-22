import User from "../models/user.model.js";

export const getUsersForSidebar = async(req,res)=>{
    try{

        const loggedInUserId = req.user._id;
        //find every user in database exept logged in user 
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        return res.status(200).json({filteredUsers});


    }catch(error){
        console.log("error in user getusersidebar",error.message)
        res.status(500).json({error:"internal server error"})
    }

}