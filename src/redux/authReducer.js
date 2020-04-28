import {authAPI} from "../api/api";
import jwt from 'jwt-decode';

const SET_AUTH_REFRESH_TOKEN = 'SET_AUTH_REFRESH_TOKEN';
const SET_AUTH_LOGOUT = 'SET_AUTH_LOGOUT';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: [],
    token: null,
    refreshToken: null,
    isAuth: false,
    user: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_REFRESH_TOKEN:
            return {
                ...state,
                token: action.token,
                refreshToken: action.refreshToken,
                isAuth: action.isAuth,
                user: action.userInfo.login
            };
        case SET_AUTH_LOGOUT:
            return {
                ...state,
                token: action.token,
                refreshToken: action.refreshToken,
                isAuth: action.isAuth
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        default:
            return state;
    }
};

export const setRefreshToken = (token, refreshToken, userInfo) => ({
    type: SET_AUTH_REFRESH_TOKEN,
    token,
    refreshToken,
    isAuth: true,
    userInfo
});

export const setLogout = () => ({
    type: SET_AUTH_LOGOUT,
    token: null,
    refreshToken: null,
    isAuth: false
});

export const setUsers = (users) => ({
    type: SET_USERS,
    users
});

export const loginThunkCreator = (email, password, enqueueSnackbar) => {
    return (dispatch) => {
        authAPI.login(email, password).then(data => {
                const userInfo = jwt(data.token);
                dispatch(setRefreshToken(data.token, data.refreshToken, userInfo))
            }
        ).catch(err => {
                enqueueSnackbar(err.message, {
                    variant: 'error'
                })
            }
        )
    }
};

export const getUsersThunkCreator = () => {
    return (dispatch) => {
        authAPI.getUsers().then(data => {
            data && dispatch(setUsers(data.data))
        })
    }
};

export const logoutThunkCreator = () => {
    return (dispatch) => {
        authAPI.logout().then(data => {
                dispatch(setLogout())
            }
        ).catch(err => {
            }
        )
    }
};
export const logoutThunkCreatorFromInterceptors = () => {
    return (dispatch) => {
                dispatch(setLogout())
    }
};

export default authReducer;
