import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import { startChecking } from '../actions/auth';
import { CalendarApp } from '../CalendarApp';
import { LoginScreen } from '../components/auth/LoginScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {

  const dispatch = useDispatch();

  const { checking, uid } = useSelector( state => state.auth );

  useEffect(() => {
  
    dispatch( startChecking() );
  
  }, [dispatch])
  
  if (checking) {
    return (<h1> Wait... </h1>)
  }

  return (
        <Routes>
            <Route path='/'   element={ <PrivateRoute isAuthenticated={!!uid} /> } >
              <Route exact path='/' element={ <CalendarApp/> } />
            </Route>
            <Route  path='/' element={<PublicRoute isAuthenticated={!!uid} />}  >
              <Route exact path='login'  element={ <LoginScreen/> } />
            </Route>
            <Route path='*'  element={ <Navigate to='/' replace  /> } />
        </Routes>
  )
}
