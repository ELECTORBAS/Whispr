import Message from "../Models/messageModel.js";
import User from "../Models/userModel.js";

export const getUsersForSidebar = async ( req, res ) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json({ success: true ,filteredUser});
    } catch (e) {
        console.error("Error in getUserForSidebar: ", e.message );
        res.status(500).json({
            error: "Internal server error"
        });
    }
}

export const getMessages = async ( req, res ) => {
    try {
        const { id:userToChatId } = req.params
        const senderId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:senderId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:senderId}
            ]})

        res.status(200).json(messages)

    } catch (e) {
        console.log("Error in getMessage", e.message);
        res.status(500).json({error: "Internal server error"})
    }
}

// export const sendMessage = async ( req, res ) => {
//     try {
//         const { text, image } = req.body;
//         const { id: recieverId } = req.params;
//         const senderId = req.user._id;

//         let imageUrl;
//         if(image) {
            
//         }

//     } catch (e) {
        
//     }
// }