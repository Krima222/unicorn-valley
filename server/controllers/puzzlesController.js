import Puzzles from '../models/puzzles.js';

export const getPuzzles = async (req, res) => {
    const puzzles = await Puzzles.find({});
    res.send(JSON.stringify(puzzles));
}

export const postPuzzles = (req, res) => {
    new Puzzles({
        name: req.body.name,
        puzzle: req.body.puzzle
    }).save();
    res.send(JSON.stringify({message: 'Новый пазл сохранён'}))
}

export const deletePuzzles = (req, res) => {
    Puzzles.remove({}, () => {
        res.send(JSON.stringify({message: 'Все пазлы удалены'}))
    });
}
