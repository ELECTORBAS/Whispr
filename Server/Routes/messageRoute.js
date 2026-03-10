import { Router } from "express";
import { getId } from "../Middleware/userMiddleware.js";
import { getMessages, getUsersForSidebar } from "../Controllers/messageController.js";

const messageRouter = Router()

messageRouter.get("/users", getId, getUsersForSidebar)
messageRouter.get("/:id", getId, getMessages)

export default messageRouter;