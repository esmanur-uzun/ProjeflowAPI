import express from "express";
import { configController } from "./controller";
const router = express.Router()

router.post("/configs/menuList",configController.createMenuData)
router.get("/configs/menuList",configController.getAll)

export default router
