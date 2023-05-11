import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [loginValues, handleLoginChange] = useForm({ lEmail: '', lPassword: ''});

    const [registerValues, handleRegisterChange] = useForm({ 
        rEmail: '', 
        rPassword: '',
        rPassword2: '',
        rName: '',
    });
    
    const { lEmail, lPassword } = loginValues;
    const { rEmail, rPassword, rPassword2, rName } = registerValues;

    const handleLogin = (e) => {
        
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword));

    };


    const handleRegister = (e) => {
        
        e.preventDefault();

        if ( rPassword !== rPassword2 ) {
            return Swal.fire('Error', 'Password must match', 'error');
        }

        dispatch(startRegister(rEmail, rPassword, rName));

    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name='lEmail'
                                value={ lEmail }
                                onChange={ handleLoginChange }
                                />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name='lPassword'
                                value={ lPassword }
                                onChange={ handleLoginChange }
                                />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Register</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name='rName'
                                value={ rName }
                                onChange={ handleRegisterChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Any@Any.com (make something up, have fun!!"
                                name='rEmail'
                                value={ rEmail }
                                onChange={ handleRegisterChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password" 
                                name='rPassword'
                                value={ rPassword }
                                onChange={ handleRegisterChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm password" 
                                name='rPassword2'
                                value={ rPassword2 }
                                onChange={ handleRegisterChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}