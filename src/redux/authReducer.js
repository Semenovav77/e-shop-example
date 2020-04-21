import {authAPI} from "../api/api";

const SET_AUTH_REFRESH_TOKEN = 'SET_AUTH_REFRESH_TOKEN';

let initialState = {
    users: [],
    refreshToken: '',
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_REFRESH_TOKEN:
            return {
                ...state,
                refreshToken: action.refreshToken,
                isAuth: action.isAuth
            };
        default:
            return state;
    }
};

export const setRefreshToken = (refreshToken) => ({
    type: SET_AUTH_REFRESH_TOKEN,
    refreshToken,
    isAuth: true
});

export const loginThunkCreator = (email, password, enqueueSnackbar) => {
    return (dispatch) => {
        authAPI.login(email, password).then(data => {
                dispatch(setRefreshToken(data.data.refreshToken))
            }
        ).catch(err => {
                enqueueSnackbar(err.message, {
                    variant: 'error'
                })
            }
        )
    }
};

export default authReducer;
