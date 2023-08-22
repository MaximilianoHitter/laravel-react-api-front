import React from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom';
import useAuthContext from '../context/AuthContext'

const AuthLayout = () => {
    const {user, logout} = useAuthContext();
    return user ? <>
    <nav className="rounder bg-black text-white px-2 py-2.5 sm:px-4 w-full mx-auto">
        <div className="container mx-auto flex flex-col items-center justify-between max-w-6xl md:block md:w-auto sm:block sm:w-auto">
            <ul
          className="mt-4 flex flex-col flex-end rounded-lg p-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium sm:flex-col sm:space-x-0 sm:text-sm sm:font-medium">
            
            <li>
              <Link
              to="/"
              className="block rounded py-2 pr-4 pl-3 text-white"
              aria-current="page"
              >
              Home</Link>
            </li>
            <li>
              <Link
              to="/tasks"
              className="block rounded py-2 pr-4 pl-3 text-white"
              aria-current="page"
              >
              Tasks</Link>
            </li>
            {user ? <>
              <li>
              <button onClick={logout}
              className="block rounded py-2 pr-4 pl-3 text-white"
              >
              Salir</button>
            </li>
            </> : <>
            <li>
              <Link
              to="/login"
              className="block rounded py-2 pr-4 pl-3 text-white"
              aria-current="page"
              >
              Ingresar</Link>
            </li>
            <li>
              <Link
              to="/register"
              className="block rounded py-2 pr-4 pl-3 text-white"
              aria-current="page"
              >
              Registrarse</Link>
            </li>
            </>}
            </ul>
        </div>
      </nav>
      <Outlet/> 
    </> : <Navigate to={'/login'}/>
}

export default AuthLayout