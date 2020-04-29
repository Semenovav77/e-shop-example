import jwt from "jwt-decode";
import {setRefreshToken} from './authReducer';
import {authAPI} from './../api/api';

const SET_INITIALIZED  = 'SET_INITIALIZED';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: action.initialized,
            };
        default:
            return state;
    }
};

export const initSuccess = (initialized) => {
    return {
        type: SET_INITIALIZED,
        initialized
    }
};

export const initializeApp = (token, refreshToken) => {
    return (dispatch) => {
        if (!token || !refreshToken) {
            dispatch(initSuccess(true));
        }
        if (token && refreshToken) {
            const userInfo  = jwt(token);
            const time =  parseInt(new Date().getTime()/1000);
            if (time <= userInfo.exp) {
                let promise = dispatch(setRefreshToken(token, refreshToken, userInfo));
                Promise.all([promise])
                    .then(() => {
                        dispatch(initSuccess(true));
                    });
            } else {
                authAPI.refreshToken(refreshToken, token).then((data) => {
                    const newUserInfo  = jwt(data.data.token);
                    let promiseNewToken = dispatch(setRefreshToken(data.data.token, data.data.refreshToken, newUserInfo));
                    Promise.all([promiseNewToken])
                        .then(() => {
                            dispatch(initSuccess(true));
                        });
                }).catch((err) => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    dispatch(initSuccess(true));
                })
            }
        }
    }
};

export default appReducer;