import React, { useReducer, useContext } from 'react'
import ContactReducer from './ContactReducer'
import ContactContext from './ContactContext'
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from './Types';
const { v4: uuidv4 } = require('uuid');

const ContactState = (props) => {
    const contactContext = useContext(ContactContext)
    const initialState = {
        contacts: [],
        current: null,
        filtered: null
    }
    const [state, dispatch] = useReducer(ContactReducer, initialState)
    //Add Contacts
    const AddContact = (contact) => {
        contact.id = uuidv4();
        dispatch({ type: ADD_CONTACT, payload: contact })
        console.log(state)
    }
    //Delete Contact
    const onDelete = (id) => {
        console.log(id)
        dispatch({ type: DELETE_CONTACT, payload: id })
    }
    const SetCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }
    const UpdateContact = (contact) => {
        dispatch({ type: UPDATE_CONTACT, payload: contact })
    }
    //filter contacts
    const FilterContacts = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }
    //clearFFilter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }
    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered:state.filtered,
            AddContact,
            onDelete,
            SetCurrent,
            clearCurrent,
            UpdateContact,
            FilterContacts,
            clearFilter
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}
export default ContactState
