import axios from 'axios';

let api = axios.create({
    timeout: 10000,
    baseURL: 'http://localhost:4001/api/v1'
});

api.interceptors.request.use(config=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error=>Promise.reject(error))

export default api;
