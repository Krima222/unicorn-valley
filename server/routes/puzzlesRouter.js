import express from 'express';
import { getPuzzles, postPuzzles, deletePuzzles } from '../controllers/puzzlesController.js'

const puzzlesRouter = express.Router();

puzzlesRouter.get('/puzzles', getPuzzles)
puzzlesRouter.post('/puzzles', postPuzzles)
puzzlesRouter.delete('/puzzles', deletePuzzles)

export default puzzlesRouter;
