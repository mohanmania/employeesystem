// const jwt =require("jsonwebtoken")
// const User = require("../models/User")
// const verifyUser = async (req,res,next)=>{
//     // const {dep_name,description} = req.body;
//     const token = req.headers.authorization.split(' ')[1];
//     try {
//         if(!req.headers.authorization){
//             return res.status(401).json({success:false, error:"authorization header missing"});
//         }
//         console.log(token)
//         if(!token){
//             return res.status(404).json({success:false,error:"Token not provided"})
//         }
//         const decoded = jwt.verify(token,process.env.JWT_KEY)
//         if(!decoded){
//             return res.status(404).json({success:false,error:"token not valid"})
//         }
//         const user = await User.findById({_id:decoded}).select('-password')
//         if(!user){
//             return res.status(404).json({success:false,error:"User not found"})
//         }
//         req.user = user
//         next()
//     } catch (error) {
//         return res.status(404).json({success:false,error:"serv  error"})

        
//     }

// }
// module.exports = verifyUser






const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyUser = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ success: false, error: "Authorization header missing" });
        }

        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, error: "Token not provided" });
        }

        const decoded = jwt.verify(token,"jwtSecretKeyAAA3333@@@#####888899999jjjjdd");

        if (!decoded || !decoded._id) {
            return res.status(401).json({ success: false, error: "Invalid token" });
        }

        const user = await User.findById(decoded._id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error", details: error.message });
    }
};

module.exports = verifyUser;
