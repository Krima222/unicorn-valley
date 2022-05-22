import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';
import userRouter from './routes/userRouter.js';

import Test from './models/test.js'

const app = express()
const db = 'mongodb+srv://test:test1q2w@cluster0.i2rzl.mongodb.net/test-db?retryWrites=true&w=majority'

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => console.log('Connect to mongoDB'))
    .catch(err => console.log(err))

app.listen(5000, err =>
    err ? console.log(err) : console.log('Server started on port 5000')
)

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use(userRouter)

//просто запрашиваем все данные
app.get('/data', async (req, res) => {
    const reqTitle = req.query.title
    const data = await Test.find(reqTitle ? {title: reqTitle} : null)
    res.send(JSON.stringify(data))
})

app.post('/data-post', (req, res) => {
    const {title, data} = req.body

    const post = new Test({
        title,
        data
    })

    post.save()
        .then(result => res.send(JSON.stringify({title: 'notification', message: 'data has been successfully recorded'})))
        .catch(err => res.send(JSON.stringify({title: 'error', error: err})))
})

app.put('/data-change', (req, res) => {
    const reqTitle = req.query.title
    const {title, data} = req.body
    if (reqTitle) {
        Test.updateMany({title: reqTitle}, {title, data})
            .then(result => res.send(JSON.stringify({title: 'notification', message: 'data has been successfully changed'})))
            .catch(err => res.send(JSON.stringify({title: 'error', error: err})))
    } else {
        res.send(JSON.stringify({title: 'error', error: 'to update, you need to specify the title'}))
    }
})

app.delete('/data-delete', (req, res) => {
    const reqTitle = req.query.title
    Test.deleteMany(reqTitle ? {title: reqTitle} : null)
        .then(result => res.send(JSON.stringify({title: 'notification', message: 'data has been successfully deleted'})))
        .catch(err => res.send(JSON.stringify({title: 'error', error: err})))
})

