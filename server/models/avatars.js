import mongoose from 'mongoose'

const avatars = new mongoose.Schema({
    src: {type: String, unique: true, required: true},
    alt: {type: String, required: true}
}, {timestamps: true})

export default mongoose.model('Avatars', avatars)
