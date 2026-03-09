import { Router } from "express";
import { checkAuth, getUserDetail, login, logout, register, verify_OTP } from "../Controllers/controller.js";

import { getId, getUser } from "../Middleware/userMiddleware.js";

const router = Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify-OTP', getId, verify_OTP)
router.get('/get-user', getId, getUserDetail )
router.get('/check-Auth', getId, checkAuth )

export default router;