// import node modules
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// import redux components
import { signIn } from '../../Action/FirebaseAction'
import { clearErrorMessage } from '../../Action/HomeActions'

// import material-ui modules
import {
    Container, FormGroup, makeStyles, FormControl, Button,
    Input, InputLabel, FormHelperText, Snackbar, Box, IconButton
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

// import constants
import * as STYLES from '../../Constants/styles';
import * as ROUTES from '../../Constants/routes';

// instantiate predefined styles into a constant variable
const useStyles = makeStyles((theme) => (STYLES.style));

// allows states stored in redux store to be mapped to components
const mapStateToProps = (state) => {
    const appState = {
        errorMessage: state.HomeReducer.errorMessage,
        signInSuccess: state.FirebaseReducer.signInSuccess,
    };
    return appState;
};

// allows view to call redux actions to perform a particular task
function mapDispatchToProps(dispatch) {
    return {
        signIn: data => dispatch(signIn(data)),
        clearErrorMessage: () => dispatch(clearErrorMessage()),
    }
}



/* *
 * Sign in page to allow user input to perform user authentication features.
 *
 * @author Jeremiah
 * @version 1.0
 * @since 19/10/2018
 * */
const SignInView = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const { register, handleSubmit, errors } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (props.signInSuccess) {
            navigate('/');
        }
    }, [props.signInSuccess]);

    const onSubmit = data => {
        props.signIn(data);
        setOpen(true);
    }

    return (
        <Container>
            <Box>
                <IconButton edge="start" color="inherit" onClick={() => navigate('/')} aria-label="close">
                    <CloseIcon />
                </IconButton>
                <h4>Sign In</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <FormControl>
                            <InputLabel>Email</InputLabel>
                            <Input name="email" inputRef={register({ required: true })} />
                            <FormHelperText>Enter the email you used for registration</FormHelperText>
                            <FormHelperText>{errors.email && <span className={classes.errorText}>Email is required</span>}</FormHelperText>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl>
                            <InputLabel>Password</InputLabel>
                            <Input type="password" name="password" inputRef={register({ required: true })} />
                            <FormHelperText>{errors.password && <span className={classes.errorText}>Password is required</span>}</FormHelperText>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" color="inherit">SignIn</Button>
                    </FormGroup>
                    <FormGroup>
                        <p>Don't have an account? Register <Link to={ROUTES.SIGN_UP}>here</Link></p>
                    </FormGroup>
                </form>

                {props.errorMessage && (
                    <Snackbar
                        open={open} color='red' autoHideDuration={600} message={props.errorMessage} action={
                            <Button color="inherit" size="small" onClick={() => props.clearErrorMessage()}>
                                X
                            </Button>
                        }
                    />
                )}
            </Box>
        </Container>
    )
}

// bridge the view to redux actions and store
const SignInPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignInView);

export default SignInPage;