import React, {useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {initializeApp} from "./redux/appReducer";

import './App.css';
import {HomeContainer} from "./containers";
import {LoginContainer} from "./containers";
import { SnackbarProvider } from 'notistack';
import {Preloader} from './components/commnon'

const App = ({initialized, initializeApp}) => {
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
        initializeApp(token, refreshToken)
    },[]);
    if (!initialized) {
        return <Preloader />
    }
    return (
        <div>
            <Switch>
                <Route exact path='/login' render={() => <SnackbarProvider maxSnack={3}> <LoginContainer /> </SnackbarProvider>}/>
                <Route path={['/','/users']} render={() => <HomeContainer/>}/>
            </Switch>
        </div>
    );
};

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = connect(mapStateToProps, {initializeApp})(App);

export default AppContainer;