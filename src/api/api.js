import axios from 'axios';
import {setLogout, logoutThunkCreatorFromInterceptors} from './../redux/authReducer'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3004'
});
let token = null;
let refreshToken = null;
let refreshRequest = null;

// Add a request interceptor
instance.interceptors.request.use((config) => {
    // Do something before request is sent
    if (!token) return config;
    const newConfig = {
        headers: {},
        ...config
    };
    newConfig.headers.Authorization = `Bearer ${token}`;
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
    if (!refreshToken || error.response.status != 401 || error.config.retry) {
        return Promise.reject(error);
    }
    if (!refreshRequest) {
        refreshRequest = instance.post('auth/refresh', {refreshToken})
    }
    refreshRequest.then(data => {
        token = data.data.token;
        refreshToken = data.data.refreshToken;
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
        const newRequest = {
            ...error.config,
            retry: true
        };
        refreshRequest = null;
        return instance(newRequest).then(() => {
                if (error.config.url === '/auth/logout') {
                    window.__store__.dispatch(logoutThunkCreatorFromInterceptors());
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
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
            token = data.data.token;
            refreshToken = data.data.refreshToken;
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
            return data.data
        })
    },
    logout() {
        return instance.post('/auth/logout').then(data => {
            token = null;
            refreshToken = null;
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            return data.data
        })
    }
};