import express from "express"
import { notificationController } from "./controller"
const router = express.Router()

router.post("/notification",notificationController.create)
router.get("/notification/:id",notificationController.getById)
router.get("/notification/user/:userId",notificationController.getNotificationsForUser)
router.delete("/notification/:id",notificationController.delete)
export default router