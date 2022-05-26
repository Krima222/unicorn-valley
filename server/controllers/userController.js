import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import {secret} from '../config.js'

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

export const registrate = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: 'Ошибка при регистрации', errors})
        }
        const {nickname, email, password} = req.body
        const condidate = await User.findOne({ $or: [{nickname}, {email}]})
        if (condidate) {
            return res.status(400).json({message: 'Пользователь уже существует, поэтому иди в лес'})
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const user = new User({nickname, email, password: hashPassword})
        await user.save()
        console.log(`Пользователь ${nickname} зарегестрирован`);
        return res.json({message: 'Пользователь успешно зарегестрирован'})
    } catch (e) {
        res.status(400).json({message: 'ошибка при регистрации ' + e.name})
    }
}

export const login = async (req, res) => {
    try {
        const {nickname, password} = req.body
        const user = await User.findOne({nickname})
        if (!user) {
            return res.status(400).json({message: `Пользователь ${nickname} не найден, иди в лес`})
        }
        const validingPassword = bcrypt.compareSync(password, user.password)
        if (!validingPassword) {
            return res.status(400).json({message: `Введён неверный пароль`})
        }
        const token = generateAccessToken(user._id)
        return res.json({token})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'ошибка при авторизации ' + e.name})
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (e) {
        console.log(e)
    }
}

export const getGameData = async (req, res) => {
    try {
        const {id} = req.query
        const data = await User.findById(id)
        res.send(JSON.stringify(data.game))
    } catch (e) {
        res.send(JSON.stringify({title: 'Дэнис, ошибка!!', message: e.message}))
    }

}

export const updateGameData = async (req, res) => {
    try {
        const {id} = req.query
        const game = req.body
        await User.findByIdAndUpdate(id, {game})
        res.send(JSON.stringify({title: 'Данные изменены', data: game}))
    } catch (e) {
        res.send(JSON.stringify({title: 'Дэнис, ошибка!!', message: e.message}))
    }
}
