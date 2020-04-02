import React from 'react';
import {connect} from 'react-redux';

import App from './../App';
import {addItem, delItem} from './../redux/productReducer'

const mapStateToProps = (state) => ({
   products: state.productsPage
});

const AppContainer = connect(mapStateToProps, {addItem, delItem})(App);

export default AppContainer;