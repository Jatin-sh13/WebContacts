import { useContext, useState, useEffect } from "react"
import React from 'react'
import ContactContext from '../Context/ContactContext'
const ContactForm = () => {
    const contactContext = useContext(ContactContext)
    const [contact, setContact] = useState({
        name: '',
        email: '',
        Phone: ''
    })
    const { current } = contactContext; //jaise hi edit button trigger hota hai current mai contact ki 
    //value save ho jati hai or apni dependency hai ki jab bhi kuch ni current mai change hota
    // hai toh useeffect trigger ho jaye
    useEffect(() => {
        if (current !== null) {
            setContact(current)
        }
        else {
            setContact({
                name: '',
                email: '',
                Phone: '',
            })
        }
    }, [contactContext, current])

    const { name, email, Phone } = contact
    const onchange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }
    const onsubmit = (e) => {
        console.log("hello")
        e.preventDefault()
        if (current === null) {
            contactContext.AddContact(contact)
        }
        else {
            contactContext.UpdateContact(contact)
        }
    }
    const clearall = () => {
        contactContext.clearCurrent()
    }
    return (
        <div>
            <form onSubmit={onsubmit}>
                <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
                <input type="text" placeholder="Name" name="name" value={name} onChange={onchange} required />
                <input type="email" placeholder="Email" name="email" value={email} onChange={onchange} required />
                <input type="text" placeholder="Phone" name="Phone" value={Phone} onChange={onchange} required />
                <button type="submit" value="Add-Contact" className="btn btn-primary btn-block">
                    {current ? 'Edit Contact' : 'Add Contact'}
                </button>
                {current && (<div><button className="btn btn-light btn-block" onClick={clearall}>ClearAll</button></div>)}
            </form>
        </div>
    )
}
export default ContactForm
