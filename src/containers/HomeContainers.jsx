import React from 'react';
import {connect} from 'react-redux';

import {Home} from './../components';
import {addItem, delItem} from './../redux/productReducer';
import {logoutThunkCreator} from './../redux/authReducer';

const mapStateToProps = (state) => ({
   products: state.productsPage,
   isAuth: state.authPage.isAuth
});

const HomeContainer = connect(mapStateToProps, {addItem, delItem, logoutThunkCreator})(Home);

export default HomeContainer;