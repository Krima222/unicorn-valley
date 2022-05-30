import { useState, useRef, useEffect } from 'react'

import './userInfo.scss'

import pencil from '../imgs/pencil.svg'

const UserInfo = ({userData: {nickname, avatar}, newNickname, setNewNickname, puzzles, setSelectedPuzzle}) => {

    const [typing, setTyping] = useState(false)
    const nickNameInput = useRef(null)

    const onType = () => {
        setTyping(true)
        nickNameInput.current.focus()
    }

    const changeNewName = (e) => {
        setNewNickname(e.target.value)
    }

    const onBlur = () => {
        setTyping(false)
    }

    useEffect(() => {
        if (typing) nickNameInput.current.focus()
    }, [typing])

    const puzzleList = (arr) => {
        return arr.map(({name, puzzle, _id}) => {
            const piecesList = puzzle.map(({img, counted, name, _id}, i) => {
                const style = counted ? 'puzzle__piece_active' : ''
                return (
                    <div key={_id} className={`puzzle__piece-${i + 1} ${style}`}>
                        <img className="puzzle__icon" src={img} alt={name}/>
                    </div>
                )
            })
            return (
                <li key={_id} className="puzzle__item" onClick={() => setSelectedPuzzle({name, puzzle})}>
                    <h2 className="puzzle__title">{name}</h2>
                    <div className="puzzle__list">{piecesList}</div>
                </li>
            )
        })
    }

    return (
        <div className="user">
            <img className="user__avatar" src={avatar} alt='avatar'/>
            <div className={typing ? 'user__nickname-field user__nickname-field_active' : 'user__nickname-field'}>
                <input
                    type="text"
                    className="user__nickname"
                    value={newNickname === null ? nickname : newNickname}
                    disabled={!typing}
                    ref={nickNameInput}
                    onChange={changeNewName}
                    onBlur={onBlur}/>
                <img
                    src={pencil}
                    alt="pencil-icon"
                    className="user__change-nickname-btn"
                    onClick={onType}/>
            </div>
            <ul className="puzzle">
                {puzzleList(puzzles)}
            </ul>
        </div>
    )
}

export default UserInfo;
