import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {useState} from 'react'
import axios from '../api/axios'

const Login = () => {

  const navigate = useNavigate();

  const [sending, setSending] = useState('false');

  const [errors, setErrors] = useState([]);

  const csrf = ()=> axios.get('/sanctum/csrf-cookie');

  const handleLogin = async (event)=>{
    event.preventDefault();
    await csrf();
    setSending('true');
    try {
      await axios.post('/login', {email: email, password: password});
      setEmail('');
      setPassword('');
      setSending('false');
      navigate('/');
    } catch (e) {
      console.log(e);
      if(e.response.status === 422){
        setErrors(e.response.data.errors);
      }
      setSending('false');
    }
  }

  const [email, setEmail] = useState('');

  const changeEmail = (e)=>{
    setEmail(e.target.value);
  }

  const [password, setPassword] = useState('');

  const changePassword = (e)=>{
    setPassword(e.target.value);
  }

  return (
    <section className=' py-10 lg:py-10'>
      <div className='container mx-auto'>
        <div className='-mx-4 flex flex-wrap'>
          <div className='w-full px-4 '>
            <div
            className='bg-black text-white relative mx-auto max-w-[525px] overflow-hidden rounded-lg py-16 px-10 text-center sm:px-12 md:px-[60px]'
            >
              <form onSubmit={handleLogin}>
                {/* Input de email con error */}
                <div className='mb-2'>
                  <input 
                  type="email" 
                  name="email" 
                  id="email"
                  placeholder='Email'
                  value={email}
                  onChange={changeEmail}
                  className='border-[#E9EDF4] w-full rounded-md border py-3 px-5 text-base text-black outline-none focus:border-primary focus-visible:shadow-none' />
                </div>
                <div className=' text-red-500 mb-2 text-center'>
                  {errors.email}
                </div>
                {/* Input de contraseña con error */}
                <div className='mb-2'>
                  <input 
                  type="password" 
                  name="password" 
                  id="password"
                  value={password}
                  onChange={changePassword}
                  placeholder='Contraseña'
                  className='border-[#E9EDF4] w-full rounded-md border py-3 px-5 text-base text-black outline-none focus:border-primary focus-visible:shadow-none' />
                </div>
                <div className=' text-red-500 mb-2 text-center'>
                  {errors.password}
                </div>
                {/* Botón de submit */}
                <div className='mb-10'>
                  <button 
                  type="submit"
                  className='w-full px-4 py-3 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white flex justify-center'
                  > {sending === 'true' && <svg className="animate-spin h-5 w-5 text-white mr-2 ..." viewBox="0 0 24 24"><path
                  className="opacity-50"
                  fill="currentColor"
                  d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
                /></svg>}  Ingresar</button>
                </div>
              </form>
              {/* Botón de olvido contraseña */}
              <Link
              to="/forgot-password"
              className='mb-2 px-3 inline-block text-base text-gray-400 hover:underline'
              >
                ¿Olvidó la contraseña?
              </Link>
              {/* Botón de registro */}
              <Link
              id='submit'
              to="/register"
              className='mb-2 px-3 inline-block text-base text-gray-400 hover:underline'
              > 
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login