import { Router } from "express";
import agentRouter from "./agents.js";
import authRouter from "./auth.js";

const router = Router();

router.use("/agents", agentRouter);
router.use("/auth", authRouter);

export default router;
