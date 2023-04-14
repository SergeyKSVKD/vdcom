import styles from './Layout.module.css'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoIcon } from './assets/logo.svg';

export const Layout = ({ children }) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('auth')) {
            navigate("/auth")
        }
    }, [])

    return (
        <div className={styles.layout}>
            <footer className={styles.footer}>
                <LogoIcon />
                <div className={styles.footer__user__container}>
                    <span>{localStorage.getItem('auth')}</span>
                </div>
            </footer>
            <div className={styles.main}>
                {children}
            </div>
        </div>
    )
}