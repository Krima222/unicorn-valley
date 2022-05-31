import { useState } from 'react'

import puzzlePieces from '../imgs/puzzles'

import './trajectoryPuzzle.scss'

const TrajectoryPuzzle = ({puzzle}) => {
    const [description, setDescription] = useState('')
    const [activePiece, setActivePiece] = useState(null)

    const choosePiece = (id, description) => {
        setActivePiece(id)
        setDescription(description)
    }

    const puzzleList = (arr) => {
        return arr.puzzle.map(({description, img, name, counted, countedColor, _id}, i) => {
            const active = _id === activePiece ? 'trajectory-puzzle__piece_active' : ''
            const PuzzleSVG = puzzlePieces[i]
            return (
                <div key={_id} className={`trajectory-puzzle__piece-${i + 1} ${active}`} onClick={() => choosePiece(_id, description)}>
                    <PuzzleSVG className="trajectory-puzzle__svg" fill={counted ? countedColor : '#DCDCE2'}/>
                    <img className="trajectory-puzzle__icon" src={img} alt={name}/>
                </div>
            )
        })
    }

    return (
        <div className="trajectory-puzzle">
            <h1 className="trajectory-puzzle__title">{puzzle.name}</h1>
            <div className="trajectory-puzzle__field">
                {puzzle.puzzle ? puzzleList(puzzle) : null}
            </div>
            <p className="trajectory-puzzle__description">{description}</p>
        </div>
    )
}

export default TrajectoryPuzzle;
