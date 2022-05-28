import mongoose from 'mongoose'

const puzzles = new mongoose.Schema({
    name: {type: String, required: true},
    puzzle: [{
        name: {type: String, required: true},
        countedColor: {type: String, required: true},
        img: {type: String, required: true},
        description: {type: String, required: true}
    }]
}, )

export default mongoose.model('Puzzles', puzzles)
