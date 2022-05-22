import User from '../models/user'
import bcrypt from 'bcryptjs'

export const registrate = async (req, res) => {
    try {
        const {nickname, email, password} = req.body
        const condidate = await User.findOne({ $or: [{nickname}, {email}]})
        if (condidate) {
            return res.status(400).json({message: 'Пользователь уже существует, поэтому иди в лес'})
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const user = new User({nickname, email, password: hashPassword})
        await user.save()
        return res.json({message: 'Пользователь успешно зарегестрирован'})
    } catch (e) {
        res.status(400).json({message: 'Registration error'})
    }
}
