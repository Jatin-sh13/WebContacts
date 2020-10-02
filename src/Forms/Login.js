import React, { useState } from 'react'

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const {email, password} = user
    const onchange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const onsubmit=(e)=>{
        e.preventDefault()
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
