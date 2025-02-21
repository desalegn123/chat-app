import express from "express";
import { protectRoute } from "../middileware/auth.middleware.js";
import { getMessages, getUsersForSideBar } from "../controller/message.controller.js";
const router=express.Router()
router.get("/users", protectRoute, getUsersForSideBar)
router.get("/:id" ,protectRoute, getMessages)
export default router