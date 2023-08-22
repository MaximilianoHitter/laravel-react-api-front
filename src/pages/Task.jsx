import {useState, useEffect} from 'react';
import axios from '../api/axios';
import useAuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Task = () => {
    const {user, getUser} = useAuthContext();

    const [tasks, setTasks] = useState([]);

    const navigate = useNavigate();

    const getTasks = async () => {
        await axios.get("/api/tasks")
            .then(function (response) {
                setTasks(response.data.data);
                console.log(tasks);
            });
      };

    useEffect(() => {
        getTasks();
      }, []);
  return (
    <div>Tasks</div>
  )
}

export default Task