import {withFormik} from 'formik';
import {connect} from 'react-redux';

import {Login} from "./../components";
import {loginThunkCreator} from "../redux/authReducer";
import { withSnackbar } from 'notistack';

const LoginContainer = withFormik({
    mapPropsToValues: () => ({email: '', password: '', remember: false}),
    validate: values => {
        let errors = {};
        /*    const keys = Object.keys(values);
            keys.forEach(key => validateFormik[key] && validateFormik[key](errors, values[key]));
            return errors;*/
    },

    handleSubmit: (values, {props, setSubmitting}) => {
        props.loginThunkCreator(values.email, values.password, props.enqueueSnackbar);
        setSubmitting(false);
  /*      setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);*/
    },

    displayName: 'Login', // helps with React DevTools
})(Login);

const mapStateToProps = (state) => ({
    isAuth: state.authPage.isAuth
});

export default connect(mapStateToProps, {loginThunkCreator}) (withSnackbar(LoginContainer));