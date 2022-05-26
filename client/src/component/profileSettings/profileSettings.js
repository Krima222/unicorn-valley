import './profileSettings.scss';
import avatar1 from '../imgs/avatar1.png';
import avatar2 from '../imgs/avatar2.png';
import avatar3 from '../imgs/avatar3.png';
import avatar4 from '../imgs/avatar4.png';
import avatar5 from '../imgs/avatar5.png';

const ProfileSettings = () => {
    return (
        <>
            <div className="avatar-list">
                <img src={avatar1} alt='' className='avatar-list__item'/>
                <img src={avatar2} alt='' className='avatar-list__item'/>
                <img src={avatar3} alt='' className='avatar-list__item'/>
                <img src={avatar4} alt='' className='avatar-list__item'/>
                <img src={avatar5} alt='' className='avatar-list__item'/>
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
