import { Link, NavLink } from 'react-router-dom';

import './profileField.scss';

const ProfileField = (props) => {
    const clazz = 'profile-field__select-btn';
    const activeClazz = 'profile-field__select-btn profile-field__select-btn_active';
    return (
        <div className="profile-field__wrapper">
            <div className="profile-field__btn-wrapper">
                {/* <Link to="courses"></Link> */}
                <NavLink
                    to="puzzle"
                    className={({isActive}) => isActive ? activeClazz : clazz}
                >
                    Траектория пазл
                </NavLink>
                <NavLink
                    to="settings"
                    className={({isActive}) => isActive ? activeClazz : clazz}
                >
                    Настройки профиля
                </NavLink>
                <NavLink
                    to="courses"
                    className={({isActive}) => isActive ? activeClazz : clazz}
                >
                    Предложенные курсы
                </NavLink>
            </div>
            <div className="profile-field__container">
                {props.children}
            </div>
        </div>
    )
}

export default ProfileField;
