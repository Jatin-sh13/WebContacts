import React, { useContext, useEffect } from 'react'
import ContactContext from '../Context/ContactContext'
import ContactItem from './ContactItem'
import Spinner from '../Layout/Spinner'
const Contacts = () => {
    const contactContext = useContext(ContactContext)
    const { contacts, filtered, getContact, loading } = contactContext
    useEffect(() => {
        getContact()
    }, [])
    return (
        <div>
            {contacts !== null && !loading ? (<div>
                {filtered !== null ? filtered.map(contact => (<ContactItem contact={contact} />)) : contacts.map(contact => (
                    <ContactItem contact={contact} />
                ))}
            </div>) : <Spinner />}
        </div>
    )
}
export default Contacts
