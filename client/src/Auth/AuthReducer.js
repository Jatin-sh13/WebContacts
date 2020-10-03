import React from 'react'
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
const AuthReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
                error:null
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }
        case CLEAR_ERRORS:{
            return{
                ...state,
                error:null
            }
        }
        case USER_LOADED:{
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:action.payload,
                error:null
            }
        }
        default: return
    }
    return (
        <div>

        </div>
    )
}
export default AuthReducer