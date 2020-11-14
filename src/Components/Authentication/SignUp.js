// import node modules
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import zxcvbn from 'zxcvbn';

// import redux components
import { signUp } from '../../Action/FirebaseAction'
import { clearErrorMessage } from '../../Action/HomeActions'

// import material-ui modules
import {
    Container, Box, FormGroup, FormControl, Button,
    Input, InputLabel, FormHelperText, Snackbar, makeStyles,
    Radio, RadioGroup, FormControlLabel, FormLabel, LinearProgress, IconButton
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
        signUpSuccess: state.FirebaseReducer.signUpSuccess,
    };
    return appState;
};

// allows view to call redux actions to perform a particular task
function mapDispatchToProps(dispatch) {
    return {
        signUp: data => dispatch(signUp(data)),
        clearErrorMessage: () => dispatch(clearErrorMessage()),
    }
}

/* *
 * Sign Up Page takes in inputs given by users and does a check with Firebase service to determine
 * if the email has already been used. If it valid and available, create a user account using the input
 * provided.
 * @author Koh Tong Liang
 * @version 1.0
 * @since 19/10/2018
 * */
function SignUpView(props) {
    const { register, handleSubmit, control, errors } = useForm();
    const [open, setOpen] = useState(true);
    const [authError, setAuthError] = useState('');
    const classes = useStyles();
    const [passwordStrength, setPasswordStrength] = useState(0);
    const passwordStrengthIndicator = ['very weak', 'weak', 'weak', 'medium', 'strong'];
    const history = useHistory();

    useEffect(() => {
        if (props.signUpSuccess) {
            history.push('/');
        }
    }, [props.signUpSuccess])

    const onSubmit = data => {
        props.signUp({ email: data.email, gender: data.gender, username: data.username, password: data.passwordOne });
        setOpen(true)
    }

    return (
        <Container>
            <IconButton edge="start" color="inherit" onClick={() => history.push('/')} aria-label="close">
                <CloseIcon />
            </IconButton>
            <h4>Sign Up</h4>
            <Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <FormControl>
                            <InputLabel>Username</InputLabel>
                            <Input name="username" inputRef={register({ required: true })} />
                            <FormHelperText>Enter the name you wish to be known by.</FormHelperText>
                            <FormHelperText>{errors.username && <span className={classes.errorText}>Username is required</span>}</FormHelperText>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl>
                            <InputLabel>Email</InputLabel>
                            <Input name="email" inputRef={register({ required: true })} />
                            <FormHelperText>Enter the email you wish to register your account with</FormHelperText>
                            <FormHelperText>{errors.email && <span className={classes.errorText}>Email is required</span>}</FormHelperText>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl>
                            <InputLabel>Password</InputLabel>
                            <Input name="passwordOne" type="password" onChange={event => setPasswordStrength(zxcvbn(event.target.value))} inputRef={register({ required: true })} />
                            <FormHelperText>{errors.passwordOne && <span className={classes.errorText}>Password is required</span>}</FormHelperText>
                            <div>
                                <LinearProgress variant="determinate" value={(passwordStrength.score / 4) * 100} />
                                <FormHelperText>Password Strength: {passwordStrengthIndicator[(passwordStrength.score)]}</FormHelperText>
                            </div>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl>
                            <InputLabel>Confirm Password</InputLabel>
                            <Input name="passwordTwo" type="password" inputRef={register({ required: true })} />
                            <FormHelperText>{errors.passwordTwo && <span className={classes.errorText}>Please confirm your password is required</span>}</FormHelperText>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl>
                            <FormLabel component="legend">Gender</FormLabel>
                            <Controller as={RadioGroup} control={control} aria-label="gender" name="gender" rules={{ required: true }}>
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </Controller>
                            <FormHelperText>{errors.gender && <span className={classes.errorText}>Please confirm your password is required</span>}</FormHelperText>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <p>Already have an account? Sign in <Link to={ROUTES.SIGN_IN}>here</Link></p>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit">
                            Sign Up
                        </Button>
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
const SignUpPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignUpView);

export default SignUpPage;