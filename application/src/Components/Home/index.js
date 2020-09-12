import React, { useState, useEffect } from 'react';
import { Fab, Paper, Typography, Container, Box, Input, Slide,
        Dialog, DialogTitle, DialogContent, DialogContentText, Button,
        DialogActions, FormGroup, FormControl, InputLabel, IconButton, Toolbar,
        AppBar } from '@material-ui/core';
import { MyLocation as MyLocationIcon, Directions as DirectionsIcon,
    Create as CreateIcon, Search as SearchIcon, Navigation as NavigationIcon,
    Close as CloseIcon } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import MapBoxTest from '../Map';

// slide up transition fragment
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    navFab: {
        top: 'auto',
        right: 35,
        bottom: 150,
        position: 'fixed',
    },
    searchFab: {
        top: 'auto',
        right: 35,
        bottom: 80,
        position: 'fixed',
    },
    slidePanel: {
        width: '50%',
        left: 10,
        bottom: 45,
        position: 'fixed',
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

function Home (props) {
    const [startLat, setStartLat] = useState(1.3483);
    const [startLng, setStartLng] = useState(103.6831);
    const [endLat, setEndLat] = useState(1.5563);
    const [endLng, setEndLng] = useState(103.6631);
    const [plannerDialog, setPlannerDialog] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const classes = useStyles();

    // check userlocation change
    useEffect(() => {
        console.log(userLocation);
    }, [userLocation])

    const getUserLocation = () => {
        window.navigator.geolocation.watchPosition(position => {
            setUserLocation(userLocation => ({ lng: position.coords.longitude, lat: position.coords.latitude }));
        });
    };

    const planTrip = () => {
        setPlannerDialog(true);
    }

    return (
        <div>
            <Paper className={classes.slidePanel} elevation={5}>
                <Container>
                    <h4>Placeholder</h4>
                </Container>
            </Paper>
            <Fab className={classes.navFab} color="primary">
                <MyLocationIcon onClick={() => getUserLocation()} />
            </Fab>
            <Fab className={classes.searchFab} color="primary">
                <DirectionsIcon onClick={() => planTrip()}/>
            </Fab>
            <MapBoxTest userLocation={userLocation} startPoint={{lat: startLat, lng: startLng}} endPoint={{lat: endLat, lng: endLng}} />

            {/* slide up directions setter */}
            <Dialog
                fullScreen
                open={plannerDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setPlannerDialog(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => setPlannerDialog(false)} aria-label="close">
                        <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Sound
                        </Typography>
                        {/* <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button> */}
                    </Toolbar>
                </AppBar>
                <Container>
                    <form onSubmit={() => console.log('s')}>
                        <FormGroup>
                            <FormControl>
                            <InputLabel>Start Location</InputLabel>
                            <Input name="startLocation"/>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormControl>
                            <InputLabel>End Location</InputLabel>
                            <Input name="endLocation"/>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" color="inherit">Plan</Button>
                        </FormGroup>
                    </form>
                </Container>
            </Dialog>
        </div>
    )
}

export default Home;