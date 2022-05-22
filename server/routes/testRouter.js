import express from 'express'
import { testGet, testPost, testPut, testDel } from '../controllers/testController.js'

const testRouter = express.Router()

testRouter.get('/test', testGet)
testRouter.post('/test', testPost)
testRouter.put('/test', testPut)
testRouter.delete('/test', testDel)

export default testRouter
