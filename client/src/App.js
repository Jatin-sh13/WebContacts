import React from 'react'
import Navbar from './Layout/Navbar'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
import About from './Pages/About'
import Home from './Pages/Home'
import AuthState from './Auth/AuthState'
import ContactState from './Context/ContactState'
import Register from './Forms/Register'
import Login from './Forms/Login'
import AlertState from './Alert/AlertState'
import PrivateRoute from './Routing/PrivateRoute'
const App = () => {
    return (
        <div>
            <AuthState>
                <ContactState>
                    <AlertState>
                        <Router>
                            <Navbar />
                            <div className="container">
                                <Switch>
                                    <PrivateRoute exact path='/' component={Home} />
                                    <Route exact path='/About' component={About} />
                                    <Route exact path='/register' component={Register} />
                                    <Route exact path='/Login' component={Login} />
                                </Switch>
                            </div>
                        </Router>
                    </AlertState>
                </ContactState>
            </AuthState>
        </div>
    )
}
export default App
