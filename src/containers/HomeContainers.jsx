import React from 'react';
import {connect} from 'react-redux';

import {Home} from './../components';
import {addItem, delItem} from './../redux/productReducer'

const mapStateToProps = (state) => ({
   products: state.productsPage
});

const HomeContainer = connect(mapStateToProps, {addItem, delItem})(Home);

export default HomeContainer;