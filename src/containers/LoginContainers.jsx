import {withFormik} from 'formik';
import {Login} from "./../components";

const LoginContainer = withFormik({
    mapPropsToValues: () => ({email: '', password: '', remember: false}),
    validate: values => {
        let errors = {};
        /*    const keys = Object.keys(values);
            keys.forEach(key => validateFormik[key] && validateFormik[key](errors, values[key]));
            return errors;*/
    },

    handleSubmit: (values, {setSubmitting}) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },

    displayName: 'Login', // helps with React DevTools
})(Login);

export default LoginContainer;