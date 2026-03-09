import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

export const getId = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if(!token){ 
            return res.status(401).json({success: false, message: "Unauthorized"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.id){
            // Set userId on req.userId (works for all request types)
            req.userId = decoded.id;
            // Also set on req.body if it exists (for POST/PUT requests)
            if (req.body) {
                req.body.userId = decoded.id;
            }
            next()
        }else{
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

    } catch (e) {
        // JWT verification errors (expired, invalid token, etc.) should return 401
        if (e.name === 'JsonWebTokenError' || e.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        // Other errors return 500
        console.error("getId middleware error:", e);
        return res.status(500).json({
            success: false,
            message: "Failed to get user ID",
            error: e.message
        })
    }
}

export const getUser = async (req, res, next) => {
    try {
        // const { userId } = req.body;
        const { token } = req.cookies;

        if(!token){ 
            return res.status(401).json({success: false, message: "Unauthorized"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded.id){
            return res.status(401).json({success: false, message: "Unauthorized"})
        }

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        req.body.user = user;
        next();
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Failed to get user"
        });
    }
};
