import React, { useContext } from 'react'
import ContactContext from '../Context/ContactContext'
import ContactState from '../Context/ContactState'
const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext)
    const { name, email, Phone, id } = contact
    //Delete
    const onDelete = () => {
        contactContext.onDelete(id)
        contactContext.clearCurrent()
        console.log(contact)
        console.log(id)
    }
    const setedit=()=>{
        contactContext.SetCurrent(contact)
        console.log(contact)
    }
    return (
        <div>
            <div className="card bg-light">
                <h3 className="text-primary text-left">
                    {name}
                </h3>
                <ul className="list">
                    <li><i className="fas fa-envelope-open-text text-primary"></i><span style={{ marginLeft: "10px" }} className="text-primary">{email}</span></li>
                    <li><i className="fas fa-phone-square-alt text-primary"></i><span style={{ marginLeft: "10px" }} className="text-primary">{Phone}</span></li>
                </ul>
                <button className="btn btn-dark" onClick={setedit}>Edit</button>
                <button className="btn btn-danger" onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}
export default ContactItem

