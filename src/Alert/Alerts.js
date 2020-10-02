import React, { useContext } from 'react'
import AlertContext from './AlertContext'
const Alerts = () => {
    const alertcontext = useContext(AlertContext)
    return (
        alertcontext.alerts.length > 0 &&
        <div key={alertcontext.alerts[0].id} className={`alert alert-${alertcontext.alerts[0].type}`}>
            <i className="fa fa-info-circle" />   {alertcontext.alerts[0].msg}
        </div>
    )
}
export default Alerts
