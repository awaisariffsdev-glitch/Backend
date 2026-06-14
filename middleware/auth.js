const jwt = require("jsonwebtoken");

const authMiddleware=async (req,res,next) => {
    try {
        const authHeaders = req.headers.authorization;
        if(!authHeaders){
            return res.status(400).json({
                Message:"Key is Required"
            })
        }

        const decoded = jwt.decode(authHeaders);

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