import React from 'react';
import {connect} from 'react-redux';

import {Users} from './../components';

const mapStateToProps = (state) => ({
   users: state.productsPage.users
});

const UsersContainer = connect(mapStateToProps, null)(Users);

export default UsersContainer;