import React, { useState } from 'react';
import { connect } from "react-redux";

import {
    Typography, Container, Input, Slide,
    Dialog, Button, FormGroup, FormControl, InputLabel, IconButton, Toolbar,
    AppBar, FormLabel, Grid
} from '@material-ui/core';
import { Close as CloseIcon, Search as SearchIcon, PinDrop as PinDropIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { searchStartLocation, searchEndLocation, processEndLocation, processStartLocation, planRoute, saveRouteName } from '../../Action/NavigationActions';
import { getTrafficImages, getErpData } from '../../Action/MapActions'
import { getUserLocation } from '../../Action/HomeActions';

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
    planBtn: {
        position: 'absolute',
        width: "100%",
        flexGrow: 1,
        textAlign: 'center',
        // padding: 5,
        bottom: 0,
    }
}));

const mapStateToProps = (state) => {
    const appState = {
        routePlannerView: state.HomeReducer.routePlannerView,
        startLocation: state.NavigationReducer.startLocation,
        endLocation: state.NavigationReducer.endLocation,
        startLocationSearchResult: state.NavigationReducer.startLocationSearchResult,
        endLocationSearchResult: state.NavigationReducer.endLocationSearchResult,
        userLocation: state.HomeReducer.userLocation,
    };
    return appState;
};

function mapDispatchToProps(dispatch) {
    const actions = {
        searchStartLocation: startLocationSearch => dispatch(searchStartLocation(startLocationSearch)),
        searchEndLocation: endLocationSearch => dispatch(searchEndLocation(endLocationSearch)),
        processStartLocation: startLocation => dispatch(processStartLocation(startLocation)),
        processEndLocation: endLocation => dispatch(processEndLocation(endLocation)),
        planRoute: (startLocation, endLocation) => dispatch(planRoute(startLocation, endLocation)),
        getUserLocation: () => dispatch(getUserLocation()),
        getTrafficImages: () => dispatch(getTrafficImages()),
        getErpData: () => dispatch(getErpData()),
        saveRouteName: routeName => dispatch(saveRouteName(routeName)),
    };
    return actions;
}

/* *
* Routeplanner component that handle planning of route. User searches start and endlocation
* and the data is stored in hooks and returned to the main component
* 
* @Koh Tong Liang
* @Version 2
* @Since 31/10/2020
* */
function RoutePlannerView(props) {
    const [startLocationSearch, setStartLocationSearch] = useState('');
    const [endLocationSearch, setEndLocationSearch] = useState('');
    const [usingUserLocation, setUsingUserLocation] = useState(false);
    const classes = useStyles();

    // handlers to clean up the form after user choose the location they want
    const handleSelectStart = r => {
        props.processStartLocation({ lng: r.geometry.coordinates[0], lat: r.geometry.coordinates[1] });
        setStartLocationSearch(r.place_name);
    }

    const handleSelectEnd = r => {
        props.processEndLocation({ lng: r.geometry.coordinates[0], lat: r.geometry.coordinates[1] });
        setEndLocationSearch(r.place_name);
    }

    const handlePlanRoute = () => {
        props.getTrafficImages();
        props.getErpData();
        props.planRoute(props.startLocation, props.endLocation);
        props.saveRouteName([startLocationSearch, endLocationSearch]);
        props.toggleRoutePlanner();
        setStartLocationSearch('');
        setEndLocationSearch('');
    }

    const handleGetUserLocation = () => {
        props.getUserLocation();
        if (props.userLocation.length > 0) {
            props.processStartLocation({ lng: props.userLocation[0].lng, lat: props.userLocation[0].lat });
        }
        setStartLocationSearch('Current Location');
    }

    return (
        <Dialog
            fullScreen
            open={props.routePlannerView}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => props.toggleRoutePlanner()}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => props.toggleRoutePlanner()} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Choose Locations
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <form>
                    <FormGroup>
                        <FormControl>
                            <Grid container spacing={3}>
                                <Grid item xs={8}>
                                    <InputLabel>Start Location</InputLabel>
                                    <Input fullWidth name="startLocation" value={startLocationSearch} onChange={e => setStartLocationSearch(e.target.value)} />
                                </Grid>
                                <Grid item xs={2} >
                                    <IconButton color="inherit" onClick={() => props.searchStartLocation(startLocationSearch)} aria-label="Search">
                                        <SearchIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton color="inherit" onClick={() => alert()} aria-label="Search">
                                        <PinDropIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Button color="inherit" onClick={() => handleGetUserLocation()}>Use Current Location</Button>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            {props.startLocationSearchResult && props.startLocationSearchResult.map(r => (
                                <Button onClick={() => handleSelectStart(r)}>{r.place_name}</Button>
                            ))}
                        </FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormControl>
                            <Grid container spacing={3}>
                                <Grid item xs={8}>
                                    <InputLabel>End Location</InputLabel>
                                    <Input fullWidth name="endLocation" value={endLocationSearch} onChange={e => setEndLocationSearch(e.target.value)} />
                                </Grid>
                                <Grid item xs={2} >
                                    <IconButton color="inherit" onClick={() => props.searchEndLocation(endLocationSearch)} aria-label="Search">
                                        <SearchIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton color="inherit" onClick={() => alert()} aria-label="Search">
                                        <PinDropIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            {props.endLocationSearchResult && props.endLocationSearchResult.map(r => (
                                <Button onClick={() => handleSelectEnd(r)}>{r.place_name}</Button>
                            ))}
                        </FormLabel>
                    </FormGroup>
                    <FormGroup className={classes.planBtn}>
                        <Button color="inherit" onClick={() => handlePlanRoute()}>Plan</Button>
                    </FormGroup>
                </form>
            </Container>
        </Dialog>
    )
}

const RoutePlanner = connect(
    mapStateToProps,
    mapDispatchToProps,
)(RoutePlannerView)

export default RoutePlanner;