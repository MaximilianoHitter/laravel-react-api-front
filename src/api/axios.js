import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
})

export const customAxios = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
})

/* axios.interceptors.response.use(response => {
    return response;
}, error => {
    return error;  
}) */
