import { Link, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import useAuthContext from "./context/AuthContext";

function App() {
  const {user, logout} = useAuthContext();
  
  return (
    <div className="bg-slate-100 min-h-screen">
      <nav className="rounder bg-black text-white px-2 py-2.5 sm:px-4 w-full mx-auto">
        <div className="container mx-auto flex flex-wrap items-center justify-between hidden max-w-6xl mx-auto md:block md:w-auto sm:block sm:w-auto">
          <a href="https://github.com/MaximilianoHitter" className="flex flex-items">
            Maximiliano Hitter
          </a>
          
            <ul
          className="mt-4 flex flex-col rounded-lg p-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium sm:flex-col sm:space-x-0 sm:text-sm sm:font-medium">
            <li>
              <Link
              to="/"
              className="block rounded py-2 pr-4 pl-3 text-white"
              aria-current="page"
              >
              Home</Link>
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
      <div className="max-w-7xl mx-auto mt-6">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
