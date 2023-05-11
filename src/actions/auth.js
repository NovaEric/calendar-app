import Swal from "sweetalert2";
import { noTokenFetch, TokenFetch } from "../helpers/fetch";
import { types } from "../types/types";
import { eventLogout } from "./event";

export const startLogin = (email, password) => {
    return async(dispatch) => {

        const resp = await noTokenFetch( 'auth', { email, password }, 'POST' );
        const body = await resp.json();
         
        if (body.ok) {
            
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch(Login({ uid: body.uid, name: body.name }));
        }else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}; 

export const startRegister = (email, password, name) => {
    return async(dispatch) => {

        const resp = await noTokenFetch( 'auth/new', { email, password, name }, 'POST' );
        const body = await resp.json();
         
        if (body.ok) {
            
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch(Login({ uid: body.uid, name: body.name }));
        }else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}; 


export const startChecking = () => {
    return async(dispatch) => {

        const resp = await TokenFetch( 'auth/renew' );
        const body = await resp.json();
         
        if (body.ok) {
            
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch(Login({ uid: body.uid, name: body.name }));
        }else {
            dispatch(checkingFinish());
        }
    }
}; 

const checkingFinish = () => ({ type: types.authCheckingFinish });

const Login = ( user ) => ({ 
    
    type: types.authLogin,
    payload: user

});

export const startLogout = () => { 

    return (dispatch) => {

        localStorage.clear();
        dispatch(eventLogout() );
        dispatch(logout());
    }
};

const logout = () => ({ type: types.authLogout });