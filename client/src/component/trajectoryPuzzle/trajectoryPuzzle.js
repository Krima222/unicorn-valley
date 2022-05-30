import { useState } from 'react';
import './trajectoryPuzzle.scss'

const TrajectoryPuzzle = ({puzzle}) => {
    const [description, setDescription] = useState('')

    const puzzleList = (arr) => {
        return arr.puzzle.map(({description, img, name, counted}, i) => {
            const style = counted ? 'trajectory-puzzle__piece_active' : ''
            return (
                <div className={`trajectory-puzzle__piece-${i + 1} ${style}`} onClick={() => setDescription(description)}>
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
