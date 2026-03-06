import jwt from "jsonwebtoken";

const getId = async (req, res, next) => {
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

export default getId;