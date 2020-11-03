import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Container, FormGroup, makeStyles, FormControl, Button,
     Input, InputLabel, FormHelperText, Snackbar, Box, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

import { signIn, clearErrorMessage } from '../../Action/FirebaseAction'

import * as ROUTES from '../../Constants/routes';

const useStyles = makeStyles((theme) => ({
        errorText: {
            color: 'red'
        },
    })
);
const mapStateToProps = (state) => {
    const appState = {
            errorMessage: state.FirebaseReducer.errorMessage,
            signInSuccess: state.FirebaseReducer.signInSuccess,
        };
    return appState;
};
function mapDispatchToProps (dispatch) {
    return {
        signIn: data => dispatch(signIn(data)),
        clearErrorMessage: () => dispatch(clearErrorMessage()),
    }
}

/* *
 * 
 * Sign in page to take in user inputs and authenticate user inputs
 * 
 * @Koh Tong Liang
 * @Version 1.0
 * @Since 19/10/2018
 * */
const SignInView = (props) => {
    const classes = useStyles();
    const [error, setError] = useState('');
    const [open, setOpen] = useState(true);
    const {register, handleSubmit, errors } = useForm();
    const history = useHistory();

    useEffect(() => {
        if (props.signInSuccess) {
            history.push('/');
        }
    }, [props.signInSuccess])

    const onSubmit = data => {
        props.signIn(data);
        setOpen(true)
    }

    return (
        <Container>
            <Box>
                <IconButton edge="start" color="inherit" onClick={() => history.push('/')}  aria-label="close">
                    <CloseIcon />
                </IconButton>
                <h4>Sign In</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <FormControl>
                        <InputLabel>Email</InputLabel>
                        <Input name="email" inputRef={register({ required: true })}/>
                        <FormHelperText>Enter the email you used for registration</FormHelperText>
                        <FormHelperText>{errors.email && <span className={classes.errorText}>Email is required</span>}</FormHelperText>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl>
                        <InputLabel>Password</InputLabel>
                        <Input type="password" name="password" inputRef={register({ required: true })}/>
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

const SignInPage = connect(
    mapStateToProps,
    mapDispatchToProps,
    )(SignInView);

export default SignInPage;