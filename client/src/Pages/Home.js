import React, { useContext, useEffect } from 'react'
import ContactForm from '../Contacts/ContactForm'
import Contacts from '../Contacts/Contacts'
import ContactFilter from '../Contacts/ContactFilter'
import AuthContext from '../Auth/AuthContext'
import ContactContext from '../Context/ContactContext'
const Home = () => {
    const authContext = useContext(AuthContext)
    const contactContext = useContext(ContactContext)
    useEffect(() => {
        authContext.loadUser()
        contactContext.getContact()
    }, []);
    return (
        <div>
            <div className="grid-2">
                <div><ContactForm /></div>
                <div>
                    {< ContactFilter />}
                    <Contacts />
                </div>
            </div>
        </div>
    )
}
export default Home
