import { createContext, useContext, useState, useEffect } from 'react';
import axios, {customAxios} from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [sending, setSending] = useState('false');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const getUser = async () => {
        await axios.get('/api/user')
            .then(function (response){
                setUser(response.data);
            });
    }

    const login = async ({ email, password }) => {
        await csrf();
        setSending('true');
        try {
            await axios.post('/login', { email: email, password: password });
            setSending('false');
            await getUser();
            navigate('/');
            setErrors([]);
        } catch (e) {
            //console.log(e);
            if (e.response.status === 422) {
                setErrors(e.response.data.errors);
            }
            setSending('false');
        }
    }

    const register = async ({ nombre, email, password, passconfirm }) => {
        await csrf();
        setSending('true');
        try {
            await axios.post('/register', {name: nombre, email: email, password: password, password_confirmation:passconfirm});
            await getUser();
            setSending('false');
            navigate('/');
            setErrors([]);
        } catch (e) {
            //console.log(e);
            if (e.response.status === 422) {
                setErrors(e.response.data.errors);
            }
            setSending('false');
        }
    };

    const logout = () => {
        axios.post('/logout').then(()=>{
            setUser(null);
        })
    }

    return <AuthContext.Provider value={{user, errors, getUser, sending, login, register, logout, csrf}}>
        {children}
    </AuthContext.Provider>

}

export default function useAuthContext(){
    return useContext(AuthContext);
}