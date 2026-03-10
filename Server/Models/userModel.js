import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    
    profilePic: {
        type : String,
        default: ""
    },
    name: {
        type : String,
        require : true,
        unique : true
    },
    email: {
        type : String,
        require : true,
        unique : true
    },
    password: {
        type : String,
        require : true,
        minlength: 6
    },
    isAuthenticated: {
        type : Boolean,
        default : false
    },
    OTP: {
        type : String,
        default : null
    },
    OTP_expire: {
        type : Number,
        default : 0
    }
}, { timestamps : true})

const User = mongoose.model("User", userSchema) || mongoose.models.User;

export default User;