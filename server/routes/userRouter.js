import express from "express";

import { registrate } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post('/registration', registrate);

export default userRouter;
