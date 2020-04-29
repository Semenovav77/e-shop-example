import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import productReducer from './productReducer'
import authReducer from './authReducer'
import appReducer from "./appReducer";

const rootReducer = combineReducers( {
    productsPage: productReducer,
    authPage: authReducer,
    app: appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store;

export default store;