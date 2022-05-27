import express from 'express';
import { getAvatars, postAvatar, deleteAvatars } from '../controllers/avatarController.js'

const avatarRouter = express.Router();

avatarRouter.get('/avatars', getAvatars)
avatarRouter.post('/avatars', postAvatar)
avatarRouter.delete('/avatars', deleteAvatars)

export default avatarRouter;
