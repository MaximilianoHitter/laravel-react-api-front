import React, {useState, useEffect} from 'react'
import axios from '../api/axios';
import useAuthContext from '../context/AuthContext';
import { useParams, useSearchParams, Link } from 'react-router-dom';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passconfirm, setPassconfirm] = useState('');
    const {token} = useParams();
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);
    const [sending, setSending] = useState('false');
    const {csrf} = useAuthContext();

    const [searchParams] = useSearchParams();

    useEffect(()=>{
        setEmail(searchParams.get('email'));
    }, [])

    const changePassword = (e)=>{setPassword(e.target.value)}
    const changePasswordconfirm = (e)=>{setPassconfirm(e.target.value)}

    const handleSubmit = async (e) => {
        e.preventDefault();
        await csrf();
        setErrors([]);
        setStatus(null);
        setSending('true');
        try {
            const response = await axios.post('/reset-password', {email, token, password: password, password_confirmation: passconfirm});
            setStatus(response.data.status);
            setErrors([]);
            setSending('false');
        } catch (e) {
            if(e.response.status === 422){
                setErrors(e.response.data.errors);
            }
            setSending('false');
        }
    }

  return (
    <section className=' py-10 lg:py-10'>
      <div className='container mx-auto'>
        <div className='-mx-4 flex flex-wrap'>
          <div className='w-full px-4 '>
            
            <div
            className='bg-black text-white relative mx-auto max-w-[525px] overflow-hidden rounded-lg py-16 px-10 text-center sm:px-12 md:px-[60px]'
            >
                {status && <div className='bg-green-700 m-2 p-2 rounded text-white'>
                    {status}
                    <div className='m-2 p-2'>
                        <Link
                            to="/login"
                            type='button'
                            className="w-full px-4 py-3 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white flex justify-center"
                            aria-current="page"
                        >
                        Ingresar
                        </Link>
                    </div>
                </div>}
                <div className='mb-10 text-center md:mb-16'>Nueva Contraseña</div>
              <form onSubmit={handleSubmit}>
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
                  placeholder='Repetir Contraseña'
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
                /></svg>} Cambiar Contraseña</button>
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword