import mongoose from 'mongoose'

const courses = new mongoose.Schema({
    title: {type: String, required: true},
    thumbnail: {type: String, required: true},
    link: {type: String, required: true}
}, {timestamps: true})

export default mongoose.model('Courses', courses)
