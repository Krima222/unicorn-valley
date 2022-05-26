import mongoose from 'mongoose'

const user = new mongoose.Schema({
    nickname: {type: String, unique: true, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    game: {}
}, {timestamps: true})

export default mongoose.model('User', user)
