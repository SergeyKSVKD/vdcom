import styles from './TotalContactsPage.module.css'
import cn from 'classnames'
import { useState, useEffect, useRef } from 'react'
import { ReactComponent as ArrowIcon } from './assets/arrow.svg'
import { useSelector, useDispatch } from 'react-redux'
import { addContacts, deleteContacts } from './contactsSlice'

export const TotalContactsPage = () => {
    const url = 'http://localhost:3001'
    const startPage = useRef()
    const [contactsList, setContactsList] = useState([])
    const [pagination, setPagination] = useState(null)
    const [activePage, setActivePage] = useState(1)

    const contacts = useSelector(state => state.contacts)
    const dispatch = useDispatch()

    const getContacts = async () => {
        const response = await fetch(`${url}/contacts`)
            .then((res) => res.json())
        if (contacts.length === 0) {
            dispatch(addContacts(response))
        }
    }

    useEffect(() => {
        getContacts()
    }, [])

    useEffect(() => {
        const PageBtn = ({ page }) => {
            return <div
                className={cn(styles.pageBtn, { [styles.activePageBtn]: activePage === page })}
                onClick={() => {
                    setActivePage(page)
                    setContactsList(contacts.slice((page - 1) * 5, (page - 1) * 5 + 5))
                    startPage.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
            >{page}</div>
        }
        const pageCount = Math.ceil(contacts.length / 5)
        const arr = new Array(pageCount).fill({})
        const arrowNextHandler = () => {
            if (activePage === pageCount) {
                return
            }
            let page = activePage + 1
            setContactsList(contacts.slice((page - 1) * 5, (page - 1) * 5 + 5))
            setActivePage(activePage + 1)
            startPage.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        const arrowPreviousHandler = () => {
            if (activePage === 1) {
                return
            }
            let page = activePage - 1
            setContactsList(contacts.slice((page - 1) * 5, (page - 1) * 5 + 5))
            setActivePage(activePage - 1)
            startPage.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }

        const pagination = arr.map((_, i) => {
            return <PageBtn key={i + 1} page={i + 1} />
        })
        setPagination(<>
            <div className={styles.pageBtn}
                onClick={() => arrowPreviousHandler()}
            ><ArrowIcon className={styles.rotate} /></div>
            {pagination}
            <div className={styles.pageBtn}
                onClick={() => arrowNextHandler()}
            ><ArrowIcon /></div>
        </>)
    }, [activePage, contacts])

    useEffect(() => {
        if (contacts) {
            setContactsList(contacts.slice(0, 5))
        }
    }, [contacts])

    return <>
        <br ref={startPage} />
        <div className={styles.contacts__container}>
            <h1>TotalContactsPage</h1>
            <ul className={styles.contacts__list}>
                <div className={styles.contacts__options}>
                    <span>Client ID</span>
                    <span>EMAIL</span>
                    <span>Client Name</span>
                    <span>Phone</span>
                    <span>TRN/PPSN</span>
                    <span>ARD</span>
                    <span>Company number</span>
                    <span>Company Address</span>
                </div>
                {contactsList ?
                    contactsList.map((item) => <li key={item.id} className={styles.contacts}>
                        <span>{item.id}</span>
                        <span>{item.email}</span>
                        <span>{item.clientName}</span>
                        <span>{item.phone}</span>
                        <span>{item.TRN}</span>
                        <span>{item.ARD}</span>
                        <span>{item.companyNumber}</span>
                        <span>{item.address}</span>
                    </li>) : "preload"
                }
                <div className={styles.pagination}>
                    {pagination}
                </div>
            </ul>
        </div>
        <button onClick={() => {dispatch(deleteContacts())
        console.log(contacts);
        }}>delete</button>
    </>
}