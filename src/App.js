import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.css';
import {HomeContainer} from "./containers";
import {LoginContainer} from "./containers";
import { SnackbarProvider } from 'notistack';

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/login' render={() => <SnackbarProvider maxSnack={3}> <LoginContainer /> </SnackbarProvider>}/>
                <Route path={['/','/users']} render={() => <HomeContainer/>}/>
            </Switch>
        </div>
    );
};

export default App;