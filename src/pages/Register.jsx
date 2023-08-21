import {useState, useEffect} from 'react'
import useAuthContext from '../context/AuthContext';
import { Link, useNavigate} from 'react-router-dom';


const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passconfirm, setPassconfirm] = useState('');
  const navigate = useNavigate();

  const changeNombre = (e)=>{setNombre(e.target.value)}
  const changeEmail = (e)=>{setEmail(e.target.value)}
  const changePassword = (e)=>{setPassword(e.target.value)}
  const changePasswordconfirm = (e)=>{setPassconfirm(e.target.value)}

  const {register, errors, sending, user, getUser, setErrors} = useAuthContext();

  const handleRegister = async (event)=>{
    event.preventDefault();
    register({nombre, email, password, passconfirm});
  }

  useEffect(()=>{
    setErrors([]);
    if(!user){
      getUser();
      if(user){
        navigate('/');
      }
    }else{
      navigate('/');
    }
  }, []);


  return (
    <section className=' py-10 lg:py-10'>
      <div className='container mx-auto'>
        <div className='-mx-4 flex flex-wrap'>
          <div className='w-full px-4 '>
            <div
            className='bg-black text-white relative mx-auto max-w-[525px] overflow-hidden rounded-lg py-16 px-10 text-center sm:px-12 md:px-[60px]'
            >
              <form onSubmit={handleRegister}>
                {/* Input de nombre con error */}
                <div className='mb-2'>
                  <input 
                  type="text" 
                  name="nombre" 
                  id="nombre"
                  value={nombre}
                  onChange={changeNombre}
                  placeholder='Nombre'
                  className='border-[#E9EDF4] w-full rounded-md border py-3 px-5 text-base text-black outline-none focus:border-primary focus-visible:shadow-none' />
                </div>
                <div className=' text-red-500 mb-2 text-center'>
                  {errors.nombre}
                </div>
                {/* Input de email con error */}
                <div className='mb-2'>
                  <input 
                  type="email" 
                  name="email" 
                  id="email"
                  value={email}
                  onChange={changeEmail}
                  placeholder='Email'
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
                {/* Input de contraseña confirm con error*/}
                <div className='mb-2'>
                  <input 
                  type="password" 
                  name="password-confirm" 
                  id="password-confirm"
                  value={passconfirm}
                  onChange={changePasswordconfirm}
                  placeholder='Contraseña'
                  className='border-[#E9EDF4] w-full rounded-md border py-3 px-5 text-base text-black outline-none focus:border-primary focus-visible:shadow-none' />
                </div>
                <div className=' text-red-500 mb-2 text-center'>
                  {errors.password_confirmation}
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
                /></svg>}
                    Registrarse</button>
                </div>
              </form>
              {/* Botón de login */}
              <Link
              to="/login"
              className='mb-2 px-3 inline-block text-base text-gray-400 hover:underline'
              > 
                ¿Ya posee cuenta?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register