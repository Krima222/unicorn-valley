import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import './profileSettings.scss';

const ProfileSettings = ({avatars, selectedAvatar, setSelectedAvatar, token}) => {

    const [response, setResponse] = useState('');

    const avatarList = (arr) =>
        arr.map(item => {
            return (
                <img
                    key={item._id}
                    src={item.src}
                    alt={item.alt}
                    className={item.src === selectedAvatar ? 'avatar-list__item avatar-list__item_active' : 'avatar-list__item'}
                    onClick={() => setSelectedAvatar(item.src)}
                />
            )
        })

    const sendAvatar = () => {
        fetch('http://localhost:5000/changeUserInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                newAvatar: selectedAvatar,
            })
        }).then(res => res.json()).then(data => {
            setResponse(data);
        })
    }

    const sendUserData = (values, resetForm) => {
        fetch('http://localhost:5000/changeUserInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                newAvatar: selectedAvatar,
                prevPassword: values.prevPassword,
                newPassword: values.newPassword
            })
        }).then(res => res.json()).then(data => {
            setResponse(data);
            console.log(data);
            resetForm();
        })
    }

    return (
        <>
            <div className="avatar-list">
                {avatarList(avatars)}
            </div>
            <Formik
                initialValues={{
                    prevPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                }}
                validationSchema={yup.object({
                    prevPassword: yup.string()
                        .min(4, 'пароль должен быть больше 4 символов')
                        .required('введите старый пароль'),
                    newPassword: yup.string()
                        .notOneOf([yup.ref('prevPassword'), null], 'новый пароль совпадает со старым')
                        .min(4, 'пароль должен быть больше 4 символов')
                        .required('введите новый пароль'),
                    confirmNewPassword: yup.string()
                        .oneOf([yup.ref('newPassword'), null], 'пароли не совпадают')
                        .required('введите пароль для подтверждения'),
                })}
                onSubmit={(values, {resetForm}) => sendUserData(values, resetForm)}
            >
                {({values, errors, touched}) => (
                    <Form onKeyUp={() => setResponse('')}>
                        <div className="change-password">
                            <Field
                                className="change-password__input"
                                type="password"
                                placeholder="Старый пароль"
                                name="prevPassword"/>
                            <Field
                                className="change-password__input"
                                type="password"
                                placeholder="Новый пароль"
                                name="newPassword"/>
                            <Field
                                className="change-password__input"
                                type="password"
                                placeholder="Подтвердить пароль"
                                name="confirmNewPassword"/>
                        </div>
                        {
                            !response && (values.prevPassword ||
                            values.newPassword ||
                            values.confirmNewPassword) &&
                            ((errors.prevPassword && touched.prevPassword) ||
                            (errors.newPassword && touched.newPassword) ||
                            (errors.confirmNewPassword && touched.confirmNewPassword)) ?
                            <span className="message message_error">
                                {errors.prevPassword || errors.newPassword || errors.confirmNewPassword}
                            </span> : null
                        }
                        {
                            response ?
                            <span className={`message message_${response.title === 'error' ? 'error' : 'success'}`}>
                                {response.message}
                            </span> : null
                        }
                        <button
                            className="change-button"
                            type="submit"
                            onClick={() => {
                                if(!(values.prevPassword || values.newPassword || values.confirmNewPassword)) {
                                    sendAvatar();
                                }
                            }}
                        >
                            Применить
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default ProfileSettings;
