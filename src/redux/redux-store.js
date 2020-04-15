import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import productReducer from './productReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers( {
    productsPage: productReducer,
    authPage: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;