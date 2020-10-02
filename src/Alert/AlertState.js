import React, { useContext, useReducer } from 'react'
import AlertContext from './AlertContext'
import AlertReducer from './AlertReducer'
import {
    SET_ALERT, 
    REMOVE_ALERT
} from '../Context/Types'
const { v4: uuidv4 } = require('uuid');
const AlertState = (props) => {
    const alertContext = useContext(AlertContext)
    const alerts = [] //Array
    const [state, dispatch] = useReducer(AlertReducer, alerts)
    //SETALERT
    const setAlert = (msg, type, timeout = 5000) => {
        const id = uuidv4()
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        })
        setTimeout(() => {
            dispatch({ type: REMOVE_ALERT, payload: id })
        }, timeout);
    }
    return (
        <AlertContext.Provider value={{
           alerts:state,
           setAlert
        }}>
            {props.children}
        </AlertContext.Provider>
    )
}
export default AlertState