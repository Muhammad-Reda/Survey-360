import axios from 'axios';

const apiClient = axios.create({
    baseURL: "https://survey360.generasiumatterbaik.com/api/public/api",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem("AuthToken")
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
})

export default apiClient;