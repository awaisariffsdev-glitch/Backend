const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware=async (req,res,next) => {
    try {
        const authHeaders = req.headers.authorization;
        if(!authHeaders){
            return res.status(400).json({
                Message:"Key is Required"
            })
        }
        const token = authHeaders.split(" ")[1];

        const decoded = jwt.verify(token,process.env.SCERCT_KEY);

        req.User = decoded;

        

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message:"Unauthroize Access"
        })
    }
}


module.exports=authMiddleware;