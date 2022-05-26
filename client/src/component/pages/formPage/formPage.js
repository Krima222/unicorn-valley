import { useState, useEffect } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useCookies } from 'react-cookie'

import './formPage.scss'

const FormPage = () => {
    const [token, setToken] = useCookies('token')
    const [error, setError] = useState('')
    const {pathname} = useLocation()

    const buttonText = pathname === '/form/login' ? 'Войти' : 'Зарегестрироваться'

    useEffect(() => {
        setError('')
    }, [pathname])

    const validationSchema = pathname === '/form/login' ?
        yup.object({
            nickname: yup.string()
                .min(2, 'имя должно содержать больше 2 символов')
                .required('введите ник'),
            password: yup.string()
                .min(4, 'пароль должен быть больше 4 символов')
                .required('введите пароль'),
        }) :
        yup.object({
            nickname: yup.string()
                .min(2, 'имя должно содержать больше 2 символов')
                .required('введите ник'),
            email: yup.string()
                .email('неправильный email адрес')
                .required('введите email'),
            password: yup.string()
                .min(4, 'пароль должен быть больше 4 символов')
                .required('введите пароль'),
            confirmPassword: yup.string()
                .oneOf([yup.ref('password'), null], 'пароль не совпадает')
        })

    const formik = useFormik({
        initialValues: {
            nickname: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: async ({nickname, email, password}, {resetForm}) => {
            if (pathname === '/form/login') {
                const res = await fetch('http://localhost:5000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({nickname, password})
                })
                const {token, message} = await res.json()
                if (!res.ok) {
                    setError(message)
                } else {
                    setToken('token', token)
                    resetForm()
                }
            } else {
                const res = await fetch('http://localhost:5000/registration', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({nickname, email, password})
                })
                const {token, message} = await res.json()
                if (!res.ok) {
                    setError(message)
                } else {
                    setToken('token', token)
                    resetForm()
                }
            }
        }
    })

    return (
        <div className="form-modal">
            <div className="form-dialog">
                <div className="form-dialog__button-wrapper">
                    <NavLink
                        to="login"
                        className={({isActive}) => isActive ? "form-dialog__link form-dialog__link_active" : "form-dialog__link"}
                    >
                        <div className="form-dialog__button-bg"/>
                        <button className="form-dialog__button">Вход</button>
                    </NavLink>
                    <NavLink
                        to="registration"
                        className={({isActive}) => isActive ? "form-dialog__link form-dialog__link_active" : "form-dialog__link"}
                    >
                        <div className="form-dialog__button-bg"/>
                        <button className="form-dialog__button">Регистрация</button>
                    </NavLink>
                </div>
                <form className="form-form" onSubmit={formik.handleSubmit}>
                    {error ? <span className="form-form__error">{error}</span>: null}
                    <Outlet context={[{
                        getFieldProps: formik.getFieldProps,
                        errors: formik.errors,
                        touched: formik.touched
                    }, {
                        setTouched: formik.setTouched,
                        resetForm: formik.resetForm
                    }]}/>
                    <button type="submit" className="form-form__button">{buttonText}</button>
                    <div className="form-form__links">
                        <a href="https://www.youtube.com/"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.8315 7.36596C17.7967 7.17731 17.6957 7.00661 17.5458 6.88367C17.396 6.76074 17.207 6.69336 17.0117 6.69332H9.16473C9.05531 6.69329 8.94696 6.71443 8.84586 6.75553C8.74477 6.79663 8.65291 6.85688 8.57554 6.93285C8.49817 7.00882 8.4368 7.09901 8.39494 7.19827C8.35308 7.29753 8.33154 7.40392 8.33157 7.51135V10.6756C8.33154 10.7831 8.35308 10.8895 8.39494 10.9887C8.4368 11.088 8.49817 11.1782 8.57554 11.2542C8.65291 11.3301 8.74477 11.3904 8.84586 11.4315C8.94696 11.4726 9.05531 11.4937 9.16473 11.4937H12.466C12.2308 11.8835 11.9083 12.2157 11.523 12.4651C10.8189 12.9034 9.99822 13.127 9.16473 13.1074C8.30031 13.0977 7.46099 12.8207 6.76606 12.3159C6.07113 11.811 5.55593 11.1039 5.29369 10.2951L5.29345 10.2938C5.00162 9.45398 5.00162 8.54287 5.29345 7.70307L5.29365 7.70172C5.55607 6.89309 6.07135 6.18622 6.76627 5.68152C7.46119 5.17683 8.30042 4.89997 9.16473 4.89028C9.64497 4.87946 10.1227 4.96189 10.5704 5.13285C11.0181 5.3038 11.427 5.55991 11.7736 5.88646C11.931 6.03417 12.1411 6.11553 12.3588 6.11314C12.5765 6.11075 12.7847 6.02481 12.9387 5.87368L15.3283 3.52742C15.4075 3.44979 15.4699 3.35728 15.5119 3.25544C15.5538 3.15359 15.5744 3.04448 15.5724 2.93464C15.5704 2.8248 15.5459 2.71648 15.5004 2.61615C15.4548 2.51582 15.3891 2.42553 15.3072 2.3507C13.6443 0.819906 11.4441 -0.0219693 9.16473 0.000436005C7.46504 -0.00450159 5.79774 0.45691 4.35086 1.33264C2.90398 2.20837 1.73507 3.46359 0.975926 4.95674L0.974701 4.95819C0.331112 6.21122 -0.0028007 7.59549 1.76942e-05 8.99884C0.00204494 10.4016 0.335711 11.7848 0.974743 13.0395L0.975968 13.0409C1.7351 14.5341 2.90402 15.7893 4.35089 16.665C5.79776 17.5408 7.46504 18.0022 9.16473 17.9972C11.402 18.0529 13.5764 17.2665 15.2423 15.7992L15.2429 15.7988L15.2436 15.7981L15.2438 15.798L15.2438 15.7979C16.1468 14.9449 16.8582 13.916 17.3322 12.7772C17.8062 11.6383 18.0324 10.4147 17.9963 9.18498C17.9966 8.57503 17.9415 7.96627 17.8315 7.36596ZM9.16473 1.63651C10.7236 1.62161 12.2457 2.1016 13.5042 3.00496L12.2931 4.19369C11.3748 3.56957 10.2815 3.24126 9.16473 3.25421C8.14513 3.25936 7.14535 3.53119 6.26829 4.04172C5.39123 4.55225 4.66857 5.28305 4.1747 6.15888L3.28388 5.48094L2.79649 5.10982C3.46699 4.04461 4.40447 3.16599 5.51937 2.55791C6.63428 1.94983 7.88936 1.63259 9.16473 1.63651ZM2.06578 11.3739C1.53312 9.8337 1.53312 8.16398 2.06578 6.62382L3.55065 7.75421C3.3608 8.57323 3.3608 9.42366 3.55065 10.2427L2.06578 11.3739ZM9.16473 16.3612C7.88934 16.3651 6.63424 16.0478 5.51932 15.4397C4.40441 14.8316 3.46692 13.9529 2.79642 12.8877L3.1117 12.6476L4.1747 11.838C4.66835 12.7141 5.39094 13.4451 6.26803 13.9558C7.14513 14.4665 8.14502 14.7384 9.16473 14.7435C10.1192 14.7545 11.0629 14.5441 11.9189 14.1293L13.3283 15.2036C12.0888 15.9878 10.639 16.3909 9.16473 16.3612ZM14.6018 14.1028L14.4493 13.9866L13.3018 13.1119C13.9035 12.4736 14.3079 11.6805 14.4679 10.8251C14.4903 10.707 14.4859 10.5855 14.4551 10.4693C14.4242 10.3531 14.3677 10.245 14.2895 10.1526C14.2113 10.0603 14.1133 9.98595 14.0025 9.93497C13.8918 9.884 13.7709 9.8576 13.6486 9.85765H9.99788V8.32939H16.2872C16.3157 8.61218 16.33 8.89818 16.33 9.18497C16.3787 10.9755 15.7647 12.7227 14.6018 14.1028H14.6018Z" fill="black"/>
                        </svg></a>
                        <a href="https://www.youtube.com/"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.65899 2.98802H9.35099V0.126027C8.53176 0.0408392 7.70863 -0.00121885 6.88499 2.68777e-05C4.43699 2.68777e-05 2.763 1.49402 2.763 4.23002V6.58802H0V9.79201H2.763V18H6.07499V9.79201H8.82899L9.24298 6.58802H6.07499V4.54502C6.07499 3.60002 6.32699 2.98802 7.65899 2.98802Z" fill="black"/>
                        </svg></a>
                        <a href="https://www.youtube.com/"><svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.4141 10.2512C12.1751 9.99282 11.9067 9.76323 11.6144 9.56715C12.794 8.65512 13.6206 7.3621 13.9533 5.90865C13.9779 5.80361 13.9815 5.69476 13.9638 5.58834C13.9461 5.48193 13.9076 5.38006 13.8504 5.2886C13.7932 5.19714 13.7185 5.11788 13.6306 5.0554C13.5426 4.99292 13.4432 4.94845 13.338 4.92453C13.2328 4.90062 13.124 4.89774 13.0177 4.91607C12.9114 4.93439 12.8097 4.97355 12.7186 5.0313C12.6275 5.08905 12.5487 5.16425 12.4868 5.25256C12.4249 5.34088 12.381 5.44057 12.3577 5.5459C12.2028 6.22578 11.9014 6.86367 11.4745 7.4151C11.0477 7.96653 10.5057 8.41822 9.88641 8.73867V5.72891C9.88136 5.6687 9.86936 5.60928 9.85066 5.55183C9.84524 5.50452 9.8358 5.45776 9.82244 5.41206C9.78753 5.33765 9.74151 5.26898 9.68596 5.20841C9.67133 5.19103 9.66394 5.16811 9.64795 5.15203C9.58802 5.0967 9.52015 5.05063 9.44661 5.01535C9.42573 5.00421 9.4102 4.98539 9.38828 4.97608C9.32559 4.95519 9.26065 4.94183 9.19482 4.93627C9.15419 4.92438 9.11265 4.91584 9.07063 4.91075L8.53529 4.90909H8.53289C8.34149 4.90818 8.15588 4.97472 8.00865 5.09703C7.86143 5.21934 7.76199 5.38961 7.7278 5.57794C7.69362 5.76627 7.72686 5.96062 7.82171 6.12687C7.91655 6.29313 8.06693 6.42066 8.24645 6.48708V10.4886C6.9499 9.14265 6.09137 7.43563 5.78392 5.59227C5.76597 5.48635 5.72734 5.385 5.67023 5.294C5.61312 5.20301 5.53864 5.12415 5.45105 5.06194C5.36347 4.99973 5.26448 4.95538 5.15976 4.93142C5.05503 4.90746 4.94661 4.90437 4.84068 4.92231C4.73476 4.94026 4.63341 4.97889 4.54241 5.036C4.45142 5.09311 4.37256 5.16759 4.31035 5.25518C4.24814 5.34276 4.20379 5.44175 4.17983 5.54647C4.15588 5.6512 4.15278 5.75962 4.17072 5.86555C4.64886 8.71491 6.23777 11.2582 8.58882 12.9375C8.62236 12.9576 8.65731 12.9753 8.69339 12.9903C8.72173 13.0069 8.7511 13.0217 8.78133 13.0346C8.87267 13.0711 8.96988 13.0907 9.06823 13.0925C9.1886 13.0911 9.3071 13.0626 9.41499 13.0092C9.42313 13.0054 9.43248 13.0072 9.44057 13.0031C9.51288 12.9654 9.57911 12.917 9.63702 12.8596C9.64866 12.8483 9.65644 12.8344 9.66743 12.8224C9.72022 12.7644 9.7643 12.699 9.79827 12.6283C9.80966 12.6049 9.82004 12.5824 9.82918 12.5578C9.86514 12.4675 9.88452 12.3715 9.88641 12.2744L9.88681 10.5349C10.3938 10.6838 10.8505 10.968 11.208 11.3571L12.5563 12.8272C12.6288 12.9067 12.7163 12.9711 12.8138 13.0166C12.9112 13.0622 13.0167 13.0881 13.1241 13.0929C13.2316 13.0977 13.339 13.0812 13.4401 13.0444C13.5412 13.0076 13.634 12.9513 13.7133 12.8785C13.7926 12.8058 13.8567 12.7182 13.9021 12.6207C13.9475 12.5231 13.9731 12.4176 13.9777 12.3101C13.9822 12.2026 13.9655 12.0953 13.9285 11.9943C13.8914 11.8933 13.8349 11.8005 13.762 11.7214L12.4141 10.2512ZM11.8651 0H6.84539C1.80766 0 0.351074 1.45499 0.351074 6.48553V11.5057C0.351074 16.5434 1.80566 18 6.83701 18H11.8568C16.8945 18 18.3511 16.545 18.3511 11.5145V6.49432C18.3511 1.45658 16.8965 0 11.8651 0ZM16.7147 11.5145C16.7147 15.6381 15.9884 16.3636 11.8568 16.3636H6.83701C2.71254 16.3636 1.98744 15.6373 1.98744 11.5057V6.48553C1.98744 2.36186 2.71374 1.63636 6.84539 1.63636H11.8651C15.9896 1.63636 16.7147 2.36266 16.7147 6.49432V11.5145Z" fill="black"/>
                        </svg></a>
                        <a href="https://www.youtube.com/"><svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.35174 4.8118e-06C7.47184 -0.00194465 5.63911 0.588508 4.11385 1.6875H8.50805C8.58264 1.6875 8.65417 1.71714 8.70691 1.76988C8.75965 1.82262 8.78928 1.89416 8.78928 1.96875C8.78928 2.04335 8.75965 2.11488 8.70691 2.16763C8.65417 2.22037 8.58264 2.25 8.50805 2.25H3.40656C1.62808 3.81372 0.538018 6.0158 0.372965 8.37831C0.207911 10.7408 0.981184 13.0731 2.52495 14.8689C4.06872 16.6648 6.2584 17.7793 8.61876 17.9706C10.9791 18.1619 13.3197 17.4145 15.1324 15.8906H10.7579C10.6833 15.8906 10.6118 15.861 10.559 15.8082C10.5063 15.7555 10.4767 15.684 10.4767 15.6094C10.4767 15.5348 10.5063 15.4632 10.559 15.4105C10.6118 15.3577 10.6833 15.3281 10.7579 15.3281H15.7427C16.9935 14.067 17.8429 12.4638 18.1838 10.7205C18.5248 8.9773 18.3419 7.17214 17.6584 5.53269C16.9748 3.89324 15.8211 2.49291 14.3429 1.50829C12.8646 0.52367 11.1279 -0.00115232 9.35174 4.8118e-06ZM14.8048 6.82031C14.7682 7.80891 14.404 11.5594 11.0251 13.5872C9.90699 14.2676 8.62304 14.6267 7.31424 14.625C5.93758 14.6189 4.58579 14.2576 3.38968 13.5759C3.33363 13.5407 3.28415 13.496 3.24344 13.4437C3.15532 13.3345 3.09434 13.2059 3.06549 13.0685C3.03665 12.9312 3.04077 12.7889 3.07752 12.6534C3.11869 12.5285 3.19084 12.416 3.28723 12.3265C3.38361 12.237 3.5011 12.1734 3.62873 12.1416C3.74122 12.1078 3.89871 12.0783 4.11666 12.0389C4.40492 11.9855 4.82114 11.9095 5.22892 11.7956C4.66655 11.4227 4.2445 10.8729 4.02948 10.2333C4.01949 10.1993 4.01243 10.1644 4.00839 10.1292C3.99598 9.99281 4.01975 9.85554 4.07729 9.73125C3.62693 9.25241 3.29257 8.67651 3.10002 8.04797C3.04382 7.91952 3.01812 7.77979 3.02496 7.63975C3.03179 7.49971 3.07095 7.36315 3.13939 7.24078C3.21339 7.12274 3.31847 7.02738 3.44312 6.96516C3.19564 6.24374 3.05643 5.18484 3.83684 4.30172C3.88889 4.24323 3.9525 4.19616 4.02366 4.16349C4.09481 4.13081 4.17196 4.11324 4.25024 4.11188H4.25868C4.33555 4.1121 4.41157 4.12793 4.48214 4.15838C4.55271 4.18884 4.61638 4.23329 4.66928 4.28906C4.68896 4.31014 6.56054 6.2775 8.60086 6.4786C8.59805 5.51531 9.03536 4.21171 10.7059 3.55923C11.0093 3.43859 11.3327 3.3761 11.6592 3.375C12.2934 3.375 12.9388 3.61547 13.5814 4.08938C13.8978 4.03735 14.21 3.93892 14.2859 3.86016C14.3387 3.79512 14.4054 3.74268 14.481 3.70668C14.5567 3.67067 14.6394 3.652 14.7232 3.65203C14.7331 3.65203 14.7443 3.65344 14.7541 3.65344C14.8431 3.65821 14.9295 3.68419 15.0063 3.72921C15.0831 3.77422 15.1481 3.83697 15.1957 3.9122C15.275 4.05202 15.3233 4.20725 15.3374 4.36738C15.3515 4.52751 15.3309 4.6888 15.2772 4.84031C15.3877 4.88365 15.4837 4.95735 15.5541 5.05289C15.6245 5.14844 15.6665 5.26194 15.6752 5.38031C15.7061 5.81484 15.5458 6.02859 14.8048 6.82031Z" fill="black"/>
                        </svg></a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormPage
