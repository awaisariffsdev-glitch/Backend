const User =require("../models/user.models");

const adminCheck = async (req,res) => {
    try {
        const userFind = await User.find({role:'user'}).select("-password");
        return res.status(200).json({
            userFind
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message:"Server Error"
        })
    }
}


module.exports = {adminCheck}