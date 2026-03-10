import { Router } from "express";
import { checkAuth, getUserDetail, login, logout, register, updateProfile, verify_OTP } from "../Controllers/authController.js";

import { getId, getUser } from "../Middleware/userMiddleware.js";

const authRoute = Router();

authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.post('/logout', logout)
authRoute.post('/verify-OTP', getId, verify_OTP)

authRoute.put("/update-profile", getId, updateProfile)

authRoute.get('/get-User', getId, getUserDetail )
authRoute.get('/check-Auth', getId, checkAuth )

export default authRoute;