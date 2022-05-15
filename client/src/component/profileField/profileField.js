import './profileField.scss';

const ProfileField = () => {
    return (
        <div className="profile-field__wrapper">
            <div className="profile-field__btn-wrapper">
                <button className="profile-field__select-btn profile-field__select-btn_active">Траектория пазл</button>
                <button className="profile-field__select-btn">Настройки профиля</button>
                <button className="profile-field__select-btn">Предложенные курсы</button>
            </div>
            <div className="profile-field__container">

            </div>
        </div>
    )
}

export default ProfileField;
