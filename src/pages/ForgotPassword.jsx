import React, {useState} from 'react'
import axios from '../api/axios';
import useAuthContext from '../context/AuthContext';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);
    const [sending, setSending] = useState('false');
    const {csrf} = useAuthContext();

    const changeEmail = (e)=>{
        setEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await csrf();
        setErrors([]);
        setStatus(null);
        setSending('true');
        try {
            const response = await axios.post('/forgot-password', {email});
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
                {status && <div className='bg-green-700 m-2 p-2 rounded text-white'>{status}</div>}
              <form onSubmit={handleSubmit}>
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
                
                {/* Botón de submit */}
                <div className='mb-10'>
                  <button 
                  type="submit"
                  className='w-full px-4 py-3 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white flex justify-center'
                  > {sending === 'true' && <svg className="animate-spin h-5 w-5 text-white mr-2 ..." viewBox="0 0 24 24"><path
                  className="opacity-50"
                  fill="currentColor"
                  d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
                /></svg>} Recuperar Contraseña</button>
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword