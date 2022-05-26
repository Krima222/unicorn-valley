import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './routes/userRouter.js'
import testRouter from './routes/testRouter.js'

const app = express()
const db = 'mongodb+srv://test:test1q2w@cluster0.i2rzl.mongodb.net/test-db?retryWrites=true&w=majority'

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connect to mongoDB')
        app.listen(5000, err =>
            err ? console.log(err) : console.log('Server started on port 5000')
        )

        app.use(express.urlencoded({extended: false}))
        app.use(express.json())
        app.use(cors())
        app.use(userRouter)
        app.use(testRouter)
    })
    .catch(err => console.log(err))
