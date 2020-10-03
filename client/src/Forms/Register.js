import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../Alert/AlertContext'
import Alerts from '../Alert/Alerts'
import AuthContext from '../Auth/AuthContext'
import { Redirect } from 'react-router-dom'
const Register = (props) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const context = useContext(AlertContext)
    const authcontext = useContext(AuthContext)
    const { register, error, clearErrors, isAuthenticated } = authcontext
    useEffect(() => {
        if (error) {
            context.setAlert('User Already Exist', 'danger')
            clearErrors()
        }
    }, [error,isAuthenticated])
    if (isAuthenticated) {
        return<Redirect to="/" />
    }
    const { name, email, password, password2 } = user
    const onchange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const onsubmit = (e) => {
        e.preventDefault()
        if (name === '' || email === '' || password === '') {
            context.setAlert('Please Enter Something', 'danger')
        }
        else if (password !== password2) {
            context.setAlert('Please Enter Valid Password', 'danger')
        }
        else {
            register({
                name,
                email,
                password,
            }
            )
        }
    }
    return (
        <div className="form-container">
            <Alerts />
            <h1>Account  <span className="text-primary">Register</span></h1>
            <form onSubmit={onsubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onchange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Email</label>
                    <input type="email" name="email" value={email} onChange={onchange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Password</label>
                    <input type='Password' name="password" value={password} onChange={onchange} required minLength="6"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="name"> Confirm Password</label>
                    <input type='Password' name="password2" value={password2} onChange={onchange}></input>
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}
export default Register
