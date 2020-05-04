import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const RedirectComponent = ({component: Component, isAuth, ...rest}) => {
        return  (
            <Route {...rest} render={() => {
                return (
                    (isAuth) ? <Component {...rest}/> : <Redirect to='/login'/>
                )}
            } />
        );
};

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.authPage.isAuth
});

const PrivateRoute = connect(mapStateToPropsForRedirect)(RedirectComponent);

export default PrivateRoute;