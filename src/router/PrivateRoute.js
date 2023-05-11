import React from 'react';
import PropTypes from 'prop-types';

import { Outlet, Navigate } from 'react-router-dom';


export const PrivateRoute = ({
    isAuthenticated
}) => {
    return isAuthenticated ? <Outlet/> : <Navigate to='login' />
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}
