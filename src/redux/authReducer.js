import {authAPI} from "../api/api";

const SET_AUTH_REFRESH_TOKEN = 'SET_AUTH_REFRESH_TOKEN';
const SET_AUTH_LOGOUT = 'SET_AUTH_LOGOUT';

let initialState = {
    users: [],
    token: null,
    refreshToken: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_REFRESH_TOKEN:
            return {
                ...state,
                token: action.token,
                refreshToken: action.refreshToken,
                isAuth: action.isAuth
            };
        case SET_AUTH_LOGOUT:
            return {
                ...state,
                token: action.token,
                refreshToken: action.refreshToken,
                isAuth: action.isAuth
            };
        default:
            return state;
    }
};

export const setRefreshToken = (token, refreshToken) => ({
    type: SET_AUTH_REFRESH_TOKEN,
    token,
    refreshToken,
    isAuth: true
});

export const setLogout = (token, refreshToken) => ({
    type: SET_AUTH_REFRESH_TOKEN,
    token,
    refreshToken,
    isAuth: false
});

export const loginThunkCreator = (email, password, enqueueSnackbar) => {
    return (dispatch) => {
        authAPI.login(email, password).then(data => {
                dispatch(setRefreshToken(data.token, data.refreshToken))
            }
        ).catch(err => {
                enqueueSnackbar(err.message, {
                    variant: 'error'
                })
            }
        )
    }
};
export const logoutThunkCreator = () => {
    return (dispatch) => {
        authAPI.logout().then(data => {
                dispatch(setLogout(null, null))
            }
        ).catch(err => {
            }
        )
    }
};

export default authReducer;
