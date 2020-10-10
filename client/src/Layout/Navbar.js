import React, { useContext, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
import AuthContext from '../Auth/AuthContext'
import '../App.css'
const Navbar = () => {
    const authContext = useContext(AuthContext)
    const { isAuthenticated, user, logOut } = authContext
    function onLogout() {
        logOut()
    }
    const authlinks = (
        <Fragment>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/About'>About</Link></li>
            <li>
                <a href="#" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt"><span className="hide-sm">Logout</span></i>
                </a>
            </li>
        </Fragment>
    )
    const guestlink = (
        <Fragment>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/Login'>Login</Link></li>
        </Fragment>
    )
    return (
        <div>
            <div className="navbar bg-primary">
                <h1>WebContacts</h1>
                <ul>
                    {isAuthenticated ? authlinks : guestlink}
                </ul>
            </div>
        </div>
    )
}
export default Navbar
