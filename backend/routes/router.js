import { Router } from "express";

import userRouter from "./users.js";

const router = Router();

router.use("/users", userRouter);
/* 
router.use("/auth", authRouter); */

export default router;
