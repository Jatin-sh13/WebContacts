import React, { useContext, useReducer } from 'react'
import AuthReducer from './AuthReducer'
import AuthContext from './AuthContext'
import Axios from 'axios'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from '../Context/Types'
import setAuthToken from '../utils/setAuthToken'
const AuthState = (props) => {
    const authContext = useContext(AuthContext)
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState)
    //Get user
    const loadUser = async () => {
        //TODO:load token into global header
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        try {
            const res = await Axios.get('/api/auth')//yha par api request mai token send krna hoga kyoki token
            //jo hai user id return krega usi user ki id ke base pai particular user ko load krenge.
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,

            })
        }
    }
    //REGISTER USER
    const register = async (formdata) => {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        try {
            const res = await Axios.post('/api/users', formdata, config)
            console.log('hello')
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            loadUser() //register hone ke baad user ki information ko load kar rhe hai 
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            })
        }
    }
    //LOGIN USER
    const loginUser = async (formdata) => {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        try {
            const res = await Axios.post('/api/auth', formdata, config)
            console.log('hello')
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            loadUser() //register or  hone ke baad user ki information ko load kar rhe hai 
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.msg
            })
        }
    }
    //LOGOUT
    const logOut = () => {
        dispatch({
            type:LOGOUT
        })
    }
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS })
    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            clearErrors,
            loadUser,
            loginUser,
            logOut
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState