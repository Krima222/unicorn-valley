import express from "express";

import { registrate, login, getGameData, updateGameData, autificationUser } from '../controllers/userController.js';
import { check } from 'express-validator';

const userRouter = express.Router();

userRouter.post('/registration', [
    check('nickname', 'Имя пользователя не должно быть пустым, идите в лес').notEmpty(),
    check('email', 'Email пользователя не должен быть пустым, идите в лес').notEmpty(),
    check('password', 'Пороль не может быть меньше 4 и больше 10 символов').isLength({min: 4, max: 10})
], registrate);
userRouter.post('/login', login);

userRouter.get('/game', getGameData);
userRouter.put('/game', updateGameData);
userRouter.get('/autification', autificationUser)

export default userRouter;
