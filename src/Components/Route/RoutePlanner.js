// import node modules
import React from 'react';
import { connect } from "react-redux";

// import redux components
import {
    searchStartLocation, searchEndLocation, processEndLocation, processStartLocation, planRoute, saveRouteName,
    setStartLocationSearch, setEndLocationSearch
} from '../../Action/NavigationActions';
import { getTrafficImages, getErpData } from '../../Action/MapActions'
import { getUserLocation, toggleMapPicker, toggleRoutePlanner } from '../../Action/HomeActions';

// import material-ui modules
import {
    Typography, Container, Input, Slide,
    Dialog, Button, FormGroup, FormControl, InputLabel, IconButton, Toolbar,
    AppBar, FormLabel, Grid, Card, CardContent
} from '@material-ui/core';
import {
    Close as CloseIcon, Search as SearchIcon, PinDrop as PinDropIcon, DirectionsCar as DirectionsCarIcon,
    PersonPin as PersonPinIcon, AddLocation as AddLocationIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

// import constants
import * as STYLES from '../../Constants/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// instantiate predefined styles into a constant variable
const useStyles = makeStyles((theme) => (STYLES.style));


// allows states stored in redux store to be mapped to components
const mapStateToProps = (state) => {
    const appState = {
        routePlannerView: state.NavigationReducer.routePlannerView,
        startLocation: state.NavigationReducer.startLocation,
        endLocation: state.NavigationReducer.endLocation,
        startLocationSearchResult: state.NavigationReducer.startLocationSearchResult,
        endLocationSearchResult: state.NavigationReducer.endLocationSearchResult,
        userLocation: state.HomeReducer.userLocation,
        mapPickerMode: state.NavigationReducer.mapPickerMode,
        mapPickerResult: state.HomeReducer.mapPickerResult,
        startLocationSearch: state.NavigationReducer.startLocationSearch,
        endLocationSearch: state.NavigationReducer.endLocationSearch,
    };
    return appState;
};

// allows view to call redux actions to perform a particular task
function mapDispatchToProps(dispatch) {
    const actions = {
        searchStartLocation: startLocationSearch => dispatch(searchStartLocation(startLocationSearch)),
        searchEndLocation: endLocationSearch => dispatch(searchEndLocation(endLocationSearch)),
        toggleRoutePlanner: () => dispatch(toggleRoutePlanner()),
        handlePlanRoute: (startLocationSearch, endLocationSearch, startLocation, endLocation) => {
            dispatch(getTrafficImages());
            dispatch(getErpData());
            dispatch(planRoute(startLocation, endLocation));
            dispatch(saveRouteName([startLocationSearch, endLocationSearch]));
            dispatch(toggleRoutePlanner());
        },
        handleSelectStart: r => {
            dispatch(processStartLocation({ lng: r.geometry.coordinates[0], lat: r.geometry.coordinates[1] }));
            dispatch(setStartLocationSearch(r.place_name));
        },
        handleSelectEnd: r => {
            dispatch(processEndLocation({ lng: r.geometry.coordinates[0], lat: r.geometry.coordinates[1] }));
            dispatch(setEndLocationSearch(r.place_name));
        },
        pickStartLocationFromMap: () => {
            dispatch(toggleMapPicker(1));
        },
        pickEndLocationFromMap: () => {
            dispatch(toggleMapPicker(2));
        },
        setStartLocationSearch: r => dispatch(setStartLocationSearch(r.place_name)),
        setEndLocationSearch: r => dispatch(setEndLocationSearch(r.place_name)),
        handleGetUserLocation: userLocation => {
            dispatch(getUserLocation());
            if (userLocation.length > 0) {
                dispatch(processStartLocation({ lng: userLocation[0].lng, lat: userLocation[0].lat }));
            }
            dispatch(setStartLocationSearch('User Location'));
        },
    };
    return actions;
}

/* *
* Routeplanner component that handle planning of route. User searches start and endlocation
* and the data is stored in hooks and returned to the main component
* @author Koh Tong Liang
* @version 2
* @since 31/10/2020
* */
function RoutePlannerView(props) {
    const classes = useStyles();

    return (
        <div>
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
                                        <Input fullWidth name="startLocation" value={props.startLocationSearch} onChange={e => props.setStartLocationSearch({place_name: e.target.value})} />
                                    </Grid>
                                    <Grid item xs={2} >
                                        <IconButton color="inherit" onClick={() => props.searchStartLocation(props.startLocationSearch)} aria-label="Search">
                                            <SearchIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton color="inherit" onClick={() => props.pickStartLocationFromMap()} aria-label="Search">
                                            <PinDropIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Button startIcon={<PersonPinIcon />} color="#1F1B24" onClick={() => props.handleGetUserLocation(props.userLocation)}>Use Current Location</Button>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormControl>
                                <Grid container spacing={3}>
                                    <Grid item xs={8}>
                                        <InputLabel>End Location</InputLabel>
                                        <Input fullWidth name="endLocation" value={props.endLocationSearch} onChange={e => props.setEndLocationSearch({place_name: e.target.value})} />
                                    </Grid>
                                    <Grid item xs={2} >
                                        <IconButton color="inherit" onClick={() => props.searchEndLocation(props.endLocationSearch)} aria-label="Search">
                                            <SearchIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton color="inherit" onClick={() => props.pickEndLocationFromMap()} aria-label="Search">
                                            <PinDropIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                {props.startLocationSearchResult && props.startLocationSearchResult.map(r => (
                                    <Card className={classes.root}>
                                        <div className={classes.details}>
                                            <CardContent className={classes.content}>
                                                <Typography component="p" variant="body1">
                                                    {r.place_name}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className={classes.controls}>
                                            <IconButton onClick={() => props.handleSelectStart(r)} aria-label="play/pause">
                                                <AddLocationIcon />
                                            </IconButton>
                                        </div>
                                    </Card>
                                ))}
                            </FormLabel>
                            <FormLabel>
                                {props.endLocationSearchResult && props.endLocationSearchResult.map(r => (
                                    <Card className={classes.root}>
                                        <div className={classes.details}>
                                            <CardContent className={classes.content}>
                                                <Typography component="p" variant="body1">
                                                    {r.place_name}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className={classes.controls}>
                                            <IconButton onClick={() => props.handleSelectEnd(r)} aria-label="play/pause">
                                                <AddLocationIcon />
                                            </IconButton>
                                        </div>
                                    </Card>
                                ))}
                            </FormLabel>
                        </FormGroup>
                        <FormGroup className={classes.planBtn}>
                            <Button startIcon={<DirectionsCarIcon />} variant="contained" color="#1F1B24" onClick={() => props.handlePlanRoute(props.startLocationSearch, props.endLocationSearch, props.startLocation, props.endLocation)}>Plan</Button>
                        </FormGroup>
                    </form>
                </Container>
            </Dialog>
        </div>
    )
}

// bridge the view to redux actions and store
const RoutePlanner = connect(
    mapStateToProps,
    mapDispatchToProps,
)(RoutePlannerView)

export default RoutePlanner;