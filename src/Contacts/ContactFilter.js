import React, { useContext, useEffect, useRef } from 'react'
import ContactContext from '../Context/ContactContext'
const ContactFilter = () => {
    const contactContext = useContext(ContactContext)
    const text = useRef('')
    useEffect(() => {
        if (contactContext.filtered === null) {
            text.current.value = ''
        }
    })
    const onchange = (e) => {
        if (text.current.value !== '') {
            contactContext.FilterContacts(e.target.value)
        }
        else {
            contactContext.clearFilter()
        }
    }
    return (
        <div>
            <form>
                <input type="text" ref={text} placeholder="Filter Contact....." onChange={onchange} />
            </form>
        </div>
    )
}
export default ContactFilter
