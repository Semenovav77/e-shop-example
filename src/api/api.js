import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3004'
});

export const authAPI = {
    login(login, password) {
        return instance.post('/auth/login', {login, password})
    }
};