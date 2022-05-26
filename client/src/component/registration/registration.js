import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import './registration.scss';

const Registration = () => {
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
                placeholder="Введите Никнейм"
                id="nickname"
                name="nickname"
                {...getFieldProps('nickname')}/>
            {errors.nickname && touched.nickname ? <span className="form-form__error">{errors.nickname}</span> : null}
            <input
                className="form-form__input"
                type="email"
                placeholder="Введите Email"
                id="email"
                name="email"
                {...getFieldProps('email')}/>
            {errors.email && touched.email ? <span className="form-form__error">{errors.email}</span> : null}
            <input
                className="form-form__input"
                type="password"
                placeholder="Введите Пароль"
                id="password"
                name="password"
                {...getFieldProps('password')}/>
            {errors.password && touched.password ? <span className="form-form__error">{errors.password}</span> : null}
            <input
                className="form-form__input"
                type="password"
                placeholder="Повторить пароль"
                id="confirmPassword"
                name="confirmPassword"
                {...getFieldProps('confirmPassword')}/>
            {errors.confirmPassword && touched.confirmPassword ? <span className="form-form__error">{errors.confirmPassword}</span> : null}
            <span className="form-form__span" >
                Нажимая кнопку «Зарегистрироваться», вы даёте своё согласие на обработку персональных данных<br/>
                в соответствии с «Политикой конфиденциальности» и соглашаетесь с «Условиями оказания услуг».
            </span>
        </>

    )
}

export default Registration;
