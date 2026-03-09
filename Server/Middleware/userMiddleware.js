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
            req.body.userId = decoded.id;
        }else{
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        next()

    } catch (e) {
        return res.status(500).json({
            succes: false,
            message: "Failed to get user ID"
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
