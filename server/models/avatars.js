import mongoose from 'mongoose'

const avatars = new mongoose.Schema({
    src: {type: String, unique: true, required: true},
}, {timestamps: true})

export default mongoose.model('Avatars', avatars)
