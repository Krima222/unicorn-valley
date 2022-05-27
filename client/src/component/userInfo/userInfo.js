import './userInfo.scss';


const UserInfo = ({nickname}) => {

    return (
        <div className="user">
            <div className="user__foto"></div>
            <div className="user__nickname">{nickname}</div>
            <div className="user__pazzls"></div>
        </div>
    )
}

export default UserInfo;
