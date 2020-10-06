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
import Axios from 'axios';

const ContactState = (props) => {
    const contactContext = useContext(ContactContext)
    const initialState = {
        contacts: [],
        current: null,
        filtered: null
    }
    const [state, dispatch] = useReducer(ContactReducer, initialState)
    //Add Contacts
    const AddContact = async (contact) => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        try {
            const res = await Axios.post('/api/contacts', contact, config)
            dispatch({ type: ADD_CONTACT, payload: res.data })
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }
    }

    //get contacts
    const getContact = async () => {
        try {
            const res = await Axios.get('/api/contacts')
            dispatch({ type: GET_CONTACTS, payload: res.data })
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }
    }
    //Delete Contact
    const onDelete = async (id) => {
        try {
            await Axios.delete(`/api/contacts/${id}`)
            dispatch({ type: DELETE_CONTACT, payload: id })
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
            })
        }
    }
    //Update Contact
    const updateContact = async (contact) => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        try {
            const res = await Axios.put(`/api/contacts/${contact._id}`, contact, config)
            dispatch({ type: ADD_CONTACT, payload: res.data })
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }
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
            filtered: state.filtered,
            AddContact,
            onDelete,
            SetCurrent,
            clearCurrent,
            UpdateContact,
            FilterContacts,
            clearFilter,
            getContact
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}
export default ContactState
