import React from 'react'
import ContactForm from '../Contacts/ContactForm'
import Contacts from '../Contacts/Contacts'
import ContactFilter from '../Contacts/ContactFilter'
const Home = () => {
    return (
        <div>
            <div className="grid-2">
                <div><ContactForm /></div>
                <div>
                    < ContactFilter />
                    <Contacts />
                </div>
            </div>
        </div>
    )
}
export default Home
