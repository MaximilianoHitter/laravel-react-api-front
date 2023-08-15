import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import useAuthContext from '../context/AuthContext'

const AuthLayout = () => {
    const {user} = useAuthContext();
    return user ? <Outlet/> : <Navigate to={'/login'}/>
}

export default AuthLayout