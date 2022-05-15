import './login.scss';

const Login = () => {
    return (
        <>
            <input className="registration-form__input" type="email" placeholder="Введите Email"/>
            <input className="registration-form__input" type="password" placeholder="Введите Пароль"/>
            <div className="registration-form__position">
                <a className="registration-form__forget-link" href="#">Забыл пороль</a>
            </div>
        </>
    )
}

export default Login;
