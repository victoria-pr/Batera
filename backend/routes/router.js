import { Router } from "express";
import agentRouter from "./agents.js";
import authRouter from "./auth.js";
import silverRouter from "./silvers.js";
import lonelyFormRouter from "./lonelyForm.js";

const router = Router();

router.use("/agents", agentRouter);
router.use("/auth", authRouter);
router.use("/silvers", silverRouter);
router.use("/lonelyForms", lonelyFormRouter);

export default router;
