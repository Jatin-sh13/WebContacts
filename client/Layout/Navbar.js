import React from 'react'
import {BrowserRouter as Router,Switch,Link,Route} from 'react-router-dom'
import '../App.css'
const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-primary">
                <h1>Contact Keeper</h1>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/About'>About</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                    <li><Link to='/Login'>Login</Link></li>
                </ul>
            </div>
        </div>
    )
}
export default Navbar