import mongoose from "mongoose"

const messageSchema = mongoose.Schema({

    senderId: {
        type : String,
        require : true
    },
    ecieverId: {
        type : String,
        require : true
    }
}, { timestamps : true})

const Messages = mongoose.model("Messages", messageSchema) || mongoose.models.Messages;

export default User;