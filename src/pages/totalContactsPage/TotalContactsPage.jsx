import styles from './TotalContactsPage.module.css'
import cn from 'classnames'
import { useState, useEffect, useRef } from 'react'
import { ReactComponent as ArrowIcon } from './assets/arrow.svg'

export const TotalContactsPage = () => {
    const url = 'http://localhost:3001'
    const startPage = useRef()
    const [contactsList, setContactsList] = useState([])
    const [pagination, setPagination] = useState(null)
    const [activePage, setActivePage] = useState(1)
    const [contacts, setContacts] = useState('')

    const getContacts = async () => {
        const response = await fetch(`${url}/contacts`)
            .then((res) => res.json())
        setContactsList(response)
        setContacts(response.slice(0, 5))
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
                    setContacts(contactsList.slice((page - 1) * 5, (page - 1) * 5 + 5))
                    startPage.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
            >{page}</div>
        }
        const pageCount = Math.ceil(contactsList.length / 5)
        const arr = new Array(pageCount).fill({})
        const arrowNextHandler = () => {
            if (activePage === pageCount) {
                return
            }
            let page = activePage + 1
            setContacts(contactsList.slice((page - 1) * 5, (page - 1) * 5 + 5))
            setActivePage(activePage + 1)
            startPage.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        const arrowPreviousHandler = () => {
            if (activePage === 1) {
                return
            }
            let page = activePage - 1
            setContacts(contactsList.slice((page - 1) * 5, (page - 1) * 5 + 5))
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
    }, [contactsList, activePage])

    return <>
        <br ref={startPage} />
        <div className={styles.contacts__container}>
            <h1>TotalContactsPage</h1>
            <ul className={styles.contacts__list}>
                {contacts ?
                    contacts.map((item) => <li key={item.id} className={styles.contacts}>
                        <p>{item.id}</p>
                        <p>{item.email}</p>
                        <p>{item.clientName}</p>
                        <p>{item.phone}</p>
                        <p>{item.PPSN}</p>
                        <p>{item.ARD}</p>
                        <p>{item.companyNumber}</p>
                        <p>{item.address}</p>
                    </li>) : "preload"
                }
                <div className={styles.pagination}>
                    {pagination}
                </div>
            </ul>
        </div>

    </>
}