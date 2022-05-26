import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import './login.scss';

const Login = () => {
    const [{getFieldProps, errors, touched}, {setTouched, resetForm}] = useOutletContext();

    useEffect(() => {
        resetForm();
        setTouched({});
    }, []);

    return (
        <>
            <input
                className="form-form__input"
                type="text"
                placeholder="Введите ник"
                id="nickname"
                name="nickname"
                {...getFieldProps('nickname')}/>
            {errors.nickname && touched.nickname ? <span className="form-form__error">{errors.nickname}</span> : null}
            <input
                className="form-form__input"
                type="password"
                placeholder="Введите Пароль"
                id="password"
                name="password"
                {...getFieldProps('password')}/>
            {errors.password && touched.password ? <span className="form-form__error">{errors.password}</span> : null}
            <div className="form-form__position">
                <a className="form-form__forget-link" href="https://ru.wikihow.com/вспомнить-забытый-пароль">Забыл пороль</a>
            </div>
        </>
    )
}

export default Login;
