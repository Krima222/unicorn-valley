import './profileSettings.scss';

const ProfileSettings = ({avatars}) => {

    const avatarList = (arr) =>
        arr.map((item, i) => {
            return (
                <img src={item.src} alt={item.alt} key={item._id} className='avatar-list__item'/>
            )
        })

    return (
        <>
            <div className="avatar-list">
                {avatarList(avatars)}
            </div>
            <div className="change-password">
                <input className="change-password__input" type="password" placeholder="Старый пароль"/>
                <input className="change-password__input" type="password" placeholder="Новый пароль"/>
                <input className="change-password__input" type="password" placeholder="Подтвердить пароль"/>
            </div>
            <button className="change-button">Применить</button>
        </>
    )
}

export default ProfileSettings;
