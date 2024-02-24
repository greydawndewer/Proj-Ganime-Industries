import axios from "axios";

const client = axios.create({
    baseURL: 'http://localhost:9000'
});

client.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if(token) {
        config.headers = {
            Authorization: `Bearer ${token}`
        }
    }
    return config;
})
client.interceptors.response.use((response) => {
    return response;
})
export default client;