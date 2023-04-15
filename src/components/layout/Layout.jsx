import styles from './Layout.module.css'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoIcon } from './assets/logo.svg';
import { ReactComponent as LogoutIcon } from './assets/logout.svg';
import { ReactComponent as ContactsIcon } from './assets/contacts.svg';
import { ReactComponent as CalendarIcon } from './assets/calendar.svg';
import { ReactComponent as ProjectIcon } from './assets/project.svg';
import { useDispatch } from 'react-redux'
import { deleteContacts } from '../../pages/totalContactsPage/contactsSlice'

export const Layout = ({ children }) => {
    const navigate = useNavigate()
    const [activeMenu, setActiveMenu] = useState('totalcontacts')
    const dispatch = useDispatch()

    useEffect(() => {
        if (!localStorage.getItem('auth')) {
            navigate("/auth")
        }
    }, [])
    const user = localStorage.getItem('auth') ? localStorage.getItem('auth').split(',') : ['', '']

    return (
        <div className={styles.layout}>
            <footer className={styles.footer}>
                <LogoIcon />
                <div className={styles.footer__user__container}>
                    <div className={styles.user__avatar}></div>
                    <div>
                        <span className={styles.username}>{user[0]}</span>
                        <span className={styles.role}>{user[1]}</span>
                    </div>
                </div>
            </footer>
            <nav className={styles.navbar}>
                <ul>
                    <li className={cn({
                        [styles.active__menu]: activeMenu === 'totalcontacts'
                    })}
                        onClick={() => {
                            setActiveMenu('totalcontacts')
                            navigate("/totalcontacts")
                        }
                        }
                    ><div className={styles.menu}><ContactsIcon />Total Contacts</div></li>
                    <li className={cn({
                        [styles.active__menu]: activeMenu === 'calendar'
                    })}
                        onClick={() => {
                            setActiveMenu('calendar')
                            navigate("/calendar")
                        }}
                    ><div className={styles.menu}><CalendarIcon />Calendar</div></li>
                    <li className={cn({
                        [styles.active__menu]: activeMenu === 'projectreport'
                    })}
                        onClick={() => {
                            setActiveMenu('projectreport')
                            navigate("/projectreport")
                        }}
                    ><div className={styles.menu}><ProjectIcon />Project Report</div></li>
                </ul>
                <div className={styles.logout}
                    onClick={() => {
                        localStorage.removeItem("auth")
                        navigate('/auth')
                        dispatch(deleteContacts())
                    }}
                ><LogoutIcon />Log out</div>
            </nav>
            <div className={styles.main}>
                {children}
            </div>
        </div>
    )
}