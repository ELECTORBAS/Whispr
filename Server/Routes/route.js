import { Router } from "express";
import { login, logout, register, verify_OTP } from "../Controllers/controller.js";

import getId from "../Middleware/userMiddleware.js";

const router = Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify-OTP', getId, verify_OTP)

export default router;