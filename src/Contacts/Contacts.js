import React, { useContext } from 'react'
import ContactContext from '../Context/ContactContext'
import ContactItem from './ContactItem'
const Contacts = () => {
    const contactContext = useContext(ContactContext)
    const { contacts, filtered } = contactContext
    return (
        <div>
            {filtered !== null ? filtered.map(contact => (<ContactItem contact={contact} />)) : contacts.map(contact => (
                <ContactItem contact={contact} />
            ))}
        </div>
    )
}
export default Contacts
