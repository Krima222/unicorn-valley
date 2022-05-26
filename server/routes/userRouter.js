import express from "express";

import { registrate, login, getUsers, getGameData, updateGameData } from '../controllers/userController.js';
import { check } from 'express-validator';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/registration', [
    check('nickname', 'Имя пользователя не должно быть пустым, идите в лес').notEmpty(),
    check('email', 'Email пользователя не должен быть пустым, идите в лес').notEmpty(),
    check('password', 'Пороль не может быть меньше 4 и больше 10 символов').isLength({min: 4, max: 10})
], registrate);
userRouter.post('/login', login);
userRouter.get('/users', authMiddleware, getUsers);

userRouter.get('/game', getGameData);
userRouter.put('/game', updateGameData);

export default userRouter;
