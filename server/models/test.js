import mongoose from 'mongoose'

const test = new mongoose.Schema({
    title: {type: String, required: true},
    data: {}
}, {timestamps: true})

export default mongoose.model('Test', test)