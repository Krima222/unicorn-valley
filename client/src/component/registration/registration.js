import './registration.scss'


const Registration = () => {
    return (
        <>
            <input className="registration-form__input" type="text" placeholder="Введите Никнейм"/>
            <input className="registration-form__input" type="email" placeholder="Введите Email"/>
            <input className="registration-form__input" type="password" placeholder="Введите Пароль"/>
            <input className="registration-form__input" type="password" placeholder="Повторить пароль"/>
            <span className="registration-form__span" >
                Нажимая кнопку «Зарегистрироваться», вы даёте своё согласие на обработку персональных данных<br/>
                в соответствии с «Политикой конфиденциальности» и соглашаетесь с «Условиями оказания услуг».
            </span>
        </>

    )
}

export default Registration;
