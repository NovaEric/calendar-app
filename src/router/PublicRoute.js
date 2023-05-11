import React from 'react';
import PropTypes from 'prop-types';

import { Outlet, Navigate } from 'react-router-dom';


export const PublicRoute = ({
    isAuthenticated
}) => {
    return isAuthenticated ? <Navigate to='/'/> : <Outlet/>;                  
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}
