import styles from './TotalContactsPage.module.css'
import cn from 'classnames'
import { useState, useEffect, useRef } from 'react'
import { ReactComponent as ArrowIcon } from './assets/arrow.svg'
import { ReactComponent as AddIcon } from './assets/add.svg'
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
    }, [contacts])

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
            let page = activePage - 1
            if (contacts.slice(page * 5, page * 5 + 5).length === 0) {
                page = activePage - 2
                setContactsList(contacts.slice(page * 5, page * 5 + 5))
            }
            setContactsList(contacts.slice(page * 5, page * 5 + 5))
        }
    }, [contacts])

    return <>
        <br ref={startPage} />
        <div className={styles.contacts__container}>
            <div className={styles.contacts__title}>
                <h1>TotalContactsPage</h1>
                <div className={styles.addContacts__button}><AddIcon />ADD</div>
            </div>
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
                    contactsList.map((item) => <li key={item.id} className={styles.contacts}
                        data-id={item.id}
                    >
                        <span>{item.id}</span>
                        <span>{item.email}</span>
                        <span>{item.clientName}</span>
                        <span>{item.phone}</span>
                        <span>{item.TRN}</span>
                        <span>{item.ARD}</span>
                        <span>{item.companyNumber}</span>
                        <span>{item.address}</span>
                        <div className={styles.remove}
                            onClick={async (e) => {
                                const response = await fetch(`${url}/contacts/${e.target.parentNode.dataset.id}`, {
                                    method: 'DELETE',
                                })
                                    .then((res) => res.json())
                                dispatch(deleteContacts())
                            }}
                        >&#x2716;</div>
                    </li>) : "preload"
                }
                <div className={styles.pagination}>
                    {pagination}
                </div>
            </ul>
        </div>
        <button className={styles.addContacts__button} onClick={() => {
            dispatch(deleteContacts())
        }}>delete</button>
    </>
}