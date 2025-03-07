import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "http://192.168.1.2:8888/api/v1"
})
