import axios from 'axios';
import {setUsers, logoutThunkCreatorFromInterceptors, setRefreshToken} from './../redux/authReducer'
import jwt from "jwt-decode";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3004'
});

let refreshRequest = null;

// Add a request interceptor
instance.interceptors.request.use((config) => {
    let tokenReq = JSON.parse(localStorage.getItem('token'));;
    // Do something before request is sent
    if (!tokenReq) return config;
    const newConfig = {
        headers: {},
        ...config
    };
    newConfig.headers.Authorization = `Bearer ${tokenReq}`;
    return newConfig;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, async error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    let token = JSON.parse(localStorage.getItem('token'));;

    if (!refreshToken || error.response.status != 401 || error.config.retry) {
        return Promise.reject(error);
    }
    if (!refreshRequest) {
        refreshRequest = instance.post('auth/refresh', {refreshToken, token})
    }
    refreshRequest.then(data => {
        let token = data.data.token;
        refreshToken = data.data.refreshToken;
        const userInfo = jwt(token);
        window.__store__.dispatch(setRefreshToken(token, refreshToken, userInfo));
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
        const newRequest = {
            ...error.config,
            retry: true
        };
        refreshRequest = null;
        return instance(newRequest).then((data) => {
                if (error.config.url === '/auth/logout') {
                    window.__store__.dispatch(logoutThunkCreatorFromInterceptors());
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                }
                if (error.config.url === '/users') {
                    window.__store__.dispatch(setUsers(data.data));
                }
            }
        );
        /*
            const data = await refreshRequest;
            token = data.data.token;
            refreshToken = data.data.refreshToken;
            const newRequest = {
                ...error.config,
                retry: true,
            };*/

    });

});
export const authAPI = {
    login(login, password) {
        return instance.post('/auth/login', {login, password}).then(data => {
            localStorage.setItem('token', JSON.stringify(data.data.token));
            localStorage.setItem('refreshToken', JSON.stringify(data.data.refreshToken));
            return data.data
        })
    },
    logout() {
        return instance.post('/auth/logout').then(data => {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            return data.data
        })
    },
    getUsers() {
        return instance.get('/users')
    },
    refreshToken(refreshToken, token) {
        return instance.post('auth/refresh', {refreshToken, token}).then(data => {
            localStorage.setItem('token', JSON.stringify(data.data.token));
            localStorage.setItem('refreshToken', JSON.stringify(data.data.refreshToken));
            return data
        })
    }
};