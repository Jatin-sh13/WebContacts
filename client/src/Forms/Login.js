import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../Alert/AlertContext'
import Alerts from '../Alert/Alerts'
import AuthContext from '../Auth/AuthContext'
import { Redirect } from 'react-router-dom'
import Spinner from '../Layout/Spinner'
const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const context = useContext(AlertContext)
    const authcontext = useContext(AuthContext)
    const { loginUser, error, clearErrors, isAuthenticated } = authcontext
    useEffect(() => {
        if (error) {
            context.setAlert('User Already Exist', 'danger')
            clearErrors()
        }
    }, [error, isAuthenticated])
    if (isAuthenticated) {
        return <Redirect to="/" />
    }
    const { email, password } = user
    const onchange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const onsubmit = (e) => {
        e.preventDefault()
        if (email === '' || password === '') {
            context.setAlert('Please Enter Something', 'danger')
        }
        else {
            loginUser({
                email, password
            })
        }
        console.log("Login Successfully")
    }
    return (
        <div className="form-container">
            <h1>Account  <span className="text-primary">Login</span></h1>
            <form onSubmit={onsubmit}>

                <div className="form-group">
                    <label htmlFor="name">Email</label>
                    <input type="email" name="email" value={email} onChange={onchange} required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Password</label>
                    <input type='Password' name="password" value={password} onChange={onchange} required></input>
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}
export default Login
