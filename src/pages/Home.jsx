import React, {useEffect} from 'react';
import useAuthContext from '../context/AuthContext';

const Home = () => {

  useEffect(()=>{
    if(!user){
      getUser();
    }
}, []);

  const {user, getUser} = useAuthContext();
  return (
    <div className='max-w-7xl mx-auto mt-12'>{user?.name}</div>
  )
}

export default Home