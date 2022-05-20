// import node modules
import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import zxcvbn from 'zxcvbn';

// import material-ui modules
import {
    Container, FormGroup, makeStyles, FormControl, Button,
    Input, InputLabel, FormHelperText, Box, IconButton, Dialog,
    AppBar, Toolbar, Typography, Slide, LinearProgress
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

// import constants
import * as STYLES from '../../../Constants/styles';
import * as ROUTES from '../../../Constants/routes';

// instantiate predefined styles into a constant variable
const useStyles = makeStyles((theme) => (STYLES.style));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/* *
 * Sign in page to allow user input to perform user authentication features.
 *
 * @author Tong Liang
 * @version 2.0
 * @since 20/05/2022
 * */
const AuthenticationPage = (props) => {
    const classes = useStyles();
    const [signInMode, setSignInMode] = useState(true);
    const { register, reset,  handleSubmit, formState: { errors } } = useForm({ });
    const [passwordStrength, setPasswordStrength] = useState(0);
    const passwordStrengthIndicator = ['very weak', 'weak', 'weak', 'medium', 'strong'];

    const onSubmit = async data => {
        props.signIn(data);
        props.toggleSignInView();
        reset({
            email: '',
            password: '',
        });
    }

    const onSignUp = async data => {
        props.signUp(data);
        props.toggleSignInView();
        reset({
            username: '',
            passwordOne: '',
            passwordTwo: '',
        });
    }

    const toggleSignIn = () => { setSignInMode(!signInMode) }

    return (
        <Dialog
            fullScreen
            open={props.signInView}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => props.toggleSignInView()}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => props.toggleSignInView()} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Authentication
                    </Typography>
                </Toolbar>
            </AppBar>
            { signInMode && 
                <Container>
                    <h4>Sign In</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <FormControl>
                                <InputLabel>Email</InputLabel>
                                <Input { ...register('email', { required: true }) } />
                                <FormHelperText>Enter the email you used for registration</FormHelperText>
                                <FormHelperText>{errors.email && <span className={classes.errorText}>Email is required</span>}</FormHelperText>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormControl>
                                <InputLabel>Password</InputLabel>
                                <Input type="password" { ...register('password', { required: true }) } />
                                <FormHelperText>{errors.password && <span className={classes.errorText}>Password is required</span>}</FormHelperText>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" color="inherit">SignIn</Button>
                        </FormGroup>
                        <FormGroup>
                            <p>Don't have an account? Register <Link to="/" onClick={() => toggleSignIn()}>here</Link></p>
                        </FormGroup>
                    </form>
                </Container>
            }
            {!signInMode && 
                <Container>
                <h4>Sign Up</h4>
                <Box>
                    <form onSubmit={handleSubmit(onSignUp)}>
                        <FormGroup>
                            <FormControl>
                                <InputLabel>Username</InputLabel>
                                <Input { ...register('username', { required: true }) } />
                                <FormHelperText>Enter the name you wish to be known by.</FormHelperText>
                                <FormHelperText>{errors.username && <span className={classes.errorText}>Username is required</span>}</FormHelperText>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormControl>
                                <InputLabel>Email</InputLabel>
                                <Input { ...register('email', { required: true }) } />
                                <FormHelperText>Enter the email you wish to register your account with</FormHelperText>
                                <FormHelperText>{errors.email && <span className={classes.errorText}>Email is required</span>}</FormHelperText>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormControl>
                                <InputLabel>Password</InputLabel>
                                <Input type="password" { ...register('passwordOne', { required: true }) } onChange={event => setPasswordStrength(zxcvbn(event.target.value))} />
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
                                <Input type="password" { ...register('passwordTwo', { required: true }) } onChange={event => setPasswordStrength(zxcvbn(event.target.value))} />
                                <FormHelperText>{errors.passwordTwo && <span className={classes.errorText}>Please confirm your password is required</span>}</FormHelperText>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <p>Already have an account? Sign in <Link to="/" onClick={() => toggleSignIn()}>here</Link></p>
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit">
                                Sign Up
                            </Button>
                        </FormGroup>
                    </form>
                </Box>
            </Container>
            }
        </Dialog>
    )
}

export default AuthenticationPage;