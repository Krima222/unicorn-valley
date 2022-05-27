import './userInfo.scss';


const UserInfo = ({userData: {nickname, avatar}}) => {

    return (
        <div className="user">
            <img className="user__foto" src={avatar} alt='avatar'/>
            <div className="user__nickname">{nickname}</div>
            <div className="user__pazzls"></div>
        </div>
    )
}

export default UserInfo;
