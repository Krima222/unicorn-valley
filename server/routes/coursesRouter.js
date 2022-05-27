import express from 'express'
import { getCourses, postCourses, deleteCourses } from '../controllers/coursesController.js'

const coursesRouter = express.Router()

coursesRouter.get('/courses', getCourses)
coursesRouter.post('/courses', postCourses)
coursesRouter.delete('/courses', deleteCourses)

export default coursesRouter
