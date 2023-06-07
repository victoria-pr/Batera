import { Router } from "express";
import agentRouter from "./agents.js";
import authRouter from "./auth.js";
import silverRouter from "./silvers.js";

const router = Router();

router.use("/agents", agentRouter);
router.use("/auth", authRouter);
router.use("/silvers", silverRouter);

export default router;
