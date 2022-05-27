import express from 'express';
import { getAvatars, postAvatar } from '../controllers/avatarController.js'

const avatarRouter = express.Router();

avatarRouter.get('/avatars', getAvatars)
avatarRouter.post('/avatars', postAvatar)

export default avatarRouter;
