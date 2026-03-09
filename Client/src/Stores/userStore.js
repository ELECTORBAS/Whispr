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
            set({ userAuth: res.data.user })
            // toast.success("User Registered Successfully")
            return res.data.user;
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
            set({ userAuth: res.data.user })
            toast.success("User Logged In Successfully")
            return res.data.user;
        } catch (e) {
            const errorMessage = e.response?.data?.message || e.message || "Could not login";
            toast.error(errorMessage);
            throw e; // Re-throw to allow component to handle if needed
        }finally{
            set({isLoggingin: false})
        }
    },
    logout : async () => {
        try {
            await axiosInstance.post("/auth/logout")
            userAuth : null;
            toast.success("Logged Out Successfully")
        } catch (e) {
            toast.error("Logged Out Failed")
        }
    },
    checkAuth : async () => {
        set({isCheckingAuth: true})
        try {
            const res = await axiosInstance.get("/auth/check-Auth")
            console.log("CheckAuth response:", res.data); // Debug log
            if (res.data && res.data.user) {
                set({ userAuth: res.data.user })
                return res.data.user
            } else {
                console.error("Unexpected response structure:", res.data);
                set({ userAuth: null })
                return null
            }
        } catch (e) {
            // Don't show error toast for 401 (unauthorized) - it's expected if user is not logged in
            if (e.response?.status !== 401) {
                console.error("Auth check error:", e.response?.data || e.message)
            } else {
                console.log("User not authenticated (401)");
            }
            set({ userAuth: null })
            return null
        } finally {
            set({isCheckingAuth: false})
        }
    }
}))

export default userAuthStore;