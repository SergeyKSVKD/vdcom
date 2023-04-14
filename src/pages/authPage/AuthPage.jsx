import { ReactComponent as LogoIcon } from './assets/logo.svg'
import { ReactComponent as EyeIcon } from './assets/eye.svg'
import { ReactComponent as EyeOffIcon } from './assets/eyeoff.svg'
import cn from 'classnames'
import styles from './AuthPage.module.css'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
    const url = 'http://localhost:3001'
    const navigate = useNavigate()
    const [isValid, setValid] = useState(
        {
            name: true,
            password: true,
        }
    )

    const initialForm = {
        name: "",
        password: ""
    }

    const [authState, setAuthState] = useState(initialForm)
    const showPass = useRef()
    const [inputType, setInputType] = useState('password')

    function handleStateChangeWithValidation(e) {
        if (e.target.value.length <= 3) {
            setValid({
                ...isValid,
                [e.target.name]: false,
            })
        }
        if (e.target.value.length > 5) {
            setValid({
                ...isValid,
                [e.target.name]: true,
            })
        }
        setAuthState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const submitHandler = async () => {
        const response = await fetch(`${url}/users`)
            .then((res) => res.json())
        const validUser = response.find((el) => el.username === authState.name)
        if (!validUser) {
            return alert('Такого пользователя не существует')
        }
        if (validUser.password !== authState.password) {
            return alert('Неправильный пароль')
        }
        localStorage.setItem('auth', authState.name)
        navigate("/totalcontacts")
    }

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            navigate("/totalcontacts")
        }
    }, [])

    return (
        <>
            <div className={styles.auth__page}>
                <div className={styles.auth__container}>
                    <LogoIcon />
                    <hr />
                    <span className={styles.auth__title}>
                        Welcome To CRM System
                    </span>
                    <span className={styles.auth__title}>
                        Sign in To Your Account
                    </span>
                    <div className={cn(styles.auth__inputContainer, {
                        [styles.error]: !isValid.name
                    })}>
                        <input
                            type='text'
                            required='required'
                            autoComplete="off"
                            placeholder='Введите имя'
                            title='Введенное имя должно содержать не менее 3-х символов'
                            onChange={handleStateChangeWithValidation}
                            name="name"
                            value={authState.name}
                        />
                    </div>
                    <div className={cn(styles.auth__inputContainer, {
                        [styles.error]: !isValid.password
                    })}>
                        <input ref={showPass}
                            type='password'
                            required='required'
                            autoComplete="off"
                            placeholder='Введите пароль'
                            title='Введенный пароль должен содержать не менее 3-х символов'
                            onChange={handleStateChangeWithValidation}
                            name="password"
                            value={authState.password}
                        />
                        {inputType === "password" ?
                            <EyeIcon onClick={() => {
                                showPass.current.type = 'text'
                                setInputType('text')
                            }} />
                            : <EyeOffIcon onClick={() => {
                                showPass.current.type = 'password'
                                setInputType('password')
                            }} />
                        }

                    </div>

                    <div className={cn(styles.auth_signin, {
                        [styles.unactive]: !isValid.name || !authState.name || !isValid.password || !authState.password
                    })}
                        onClick={submitHandler}
                    >
                        SIGN IN
                    </div>
                </div>
            </div>
        </>
    )
}

