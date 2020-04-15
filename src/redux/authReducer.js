import {authAPI} from "../api/api";

const SET_AUTH_REFRESH_TOKEN = 'SET_AUTH_REFRESH_TOKEN';

let initialState = {
    users: [],
    refreshToken: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_REFRESH_TOKEN:
            return {
                ...state,
                refreshToken: action.refreshToken
            };
        default:
            return state;
    }
};

export const setRefreshToken = (refreshToken) => ({
    type: SET_AUTH_REFRESH_TOKEN,
    refreshToken
});

export const loginThunkCreator = (email, password, enqueueSnackbar) => {
    return (dispatch) => {
        authAPI.login(email, password).then( data => {
            dispatch(setRefreshToken(data.data.refreshToken))
            }
        ).catch( err => {
                console.log(err.status);
               enqueueSnackbar(err.message, {
                   variant: 'error'
               })
            }
        )
    }
};

export default authReducer;
