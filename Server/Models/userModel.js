import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    name: {
        type : String,
        require : true
    },
    email: {
        type : String,
        require : true,
        unique : true
    },
    password: {
        type : String,
        require : true
    },
    isAuthenticated: {
        type : Boolean,
        default : false
    },
    authOTP: {
        type : String,
        default : null
    }
}, {timestamp : true})

const User = mongoose.model("User", userSchema) || mongoose.models.User;

export default User;