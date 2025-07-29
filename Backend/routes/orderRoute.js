import express from "express";
import authMiddleware from "../middleware/auth.js";

import { listOrders, placeOrder, updatestatus, userorders, verifyOrder } from "../controllers/orderController.js";

const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,userorders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updatestatus)
export default orderRouter;

