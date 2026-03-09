import { create } from "zustand"
import axiosInstance from "../libs/axiosInstance";
import { toast } from "react-toastify";

const userAuthStore = create((set) => ({
    userAuth : null,
    isSigningUp : false,
    isLoggingin : false,
    isCheckingAuth : false,
    isVerifyingOTP : false,

    signup : async ({name, email, password}) => {
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post('/auth/register', {
                name, email, password
            });
            set({ userAuth: res.data})
            // toast.success("User Registered Successfully")
            return res.data;
        } catch (e) {
            const errorMessage = e.response?.data?.message || e.message || "Could not register";
            toast.error(errorMessage);
            throw e; // Re-throw to allow component to handle if needed
        }finally{
            set({isSigningUp: false})
        }
    },
    verifyOTP : async ({OTP}) => {
        set({isVerifyingOTP : true})
        try {
            const res = await axiosInstance.post('/auth/verify-OTP', {
                OTP
            })
        } catch (e) {
            
        }
    },
    login : async ({ email, password}) => {
        set({isLoggingin: true})
        try {
            const res = await axiosInstance.post('/auth/login', {
                email, password
            });
            set({ userAuth: res.data})
            toast.success("User Logged In Successfully")
            return res.data;
        } catch (e) {
            const errorMessage = e.response?.data?.message || e.message || "Could not register";
            toast.error(errorMessage);
            throw e; // Re-throw to allow component to handle if needed
        }finally{
            set({isLoggingin: false})
        }
    },
    checkAuth : async () => {
        try {
            const res = await axiosInstance.get("/auth/check-Auth")
            set({userAuth : res.data})
            return res.data
        } catch (e) {
            toast.error(e.message)
        }
    }
}))

export default userAuthStore;