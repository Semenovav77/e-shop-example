import React from 'react';
import {connect} from 'react-redux';

import App from './../App';
import {addItem} from './../redux/productReducer'

const mapStateToProps = (state) => ({
   products: state.productsPage
});

const AppContainer = connect(mapStateToProps, {addItem})(App);

export default AppContainer;