import { Router } from "express";
import { login, logout, register, send_OTP } from "../Controllers/controller.js";

const router = Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/send-OTP', send_OTP)

export default router;