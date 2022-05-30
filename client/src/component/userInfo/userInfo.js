import { useState, useRef, useEffect } from 'react'

import './userInfo.scss';

import pencil from '../imgs/pencil.svg';

const UserInfo = ({userData: {nickname, avatar}, newNickname, setNewNickname}) => {

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
            <div className="user__pazzls"></div>
        </div>
    )
}

export default UserInfo;
