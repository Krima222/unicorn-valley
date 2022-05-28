import mongoose from 'mongoose'

const user = new mongoose.Schema({
    avatar: {type: String, required: true, default: 'http://localhost:5000/images/avatars/avatar1.png'},
    nickname: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    puzzles: [
        {
            name: {type: String, required: true},
            puzzle: [
                {
                    name: {type: String, required: true},
                    counted: {type: Boolean, required: true}
                }
            ]
        }
    ],
    game: {}
}, {timestamps: true})

export default mongoose.model('User', user)
