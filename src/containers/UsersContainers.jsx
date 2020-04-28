import React from 'react';
import {connect} from 'react-redux';
import {getUsersThunkCreator} from './../redux/authReducer';

import {Users} from './../components';

const mapStateToProps = (state) => ({
   users: state.authPage.users
});

const UsersContainer = connect(mapStateToProps, {getUsersThunkCreator})(Users);

export default UsersContainer;