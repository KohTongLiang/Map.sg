// import node modules
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Fab } from '@material-ui/core';

// import redux components
import { getUserLocation, toggleRoutePlanner, clearErrorMessage, toggleMapPicker, 
    toggleHistoryView, toggleBookmarkView, overrideUserLocation, toggleSignInView } from '../../Action/HomeActions';
import { cancelRoute, searchStartLocation, searchEndLocation, processEndLocation, processStartLocation, planRoute, saveRouteName,
    setStartLocationSearch, setEndLocationSearch, runHistory, toggleBookmark, tripSummary } from '../../Action/NavigationActions';
import { getTrafficImages, getErpData } from '../../Action/MapActions';
import { deleteHistory, signIn, signUp } from '../../Action/FirebaseAction';

// import material-ui modules
import { MyLocation as MyLocationIcon, Directions as DirectionsIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Snackbar } from '@material-ui/core';

// import view components
import Map from './Map';
import NavBar from './NavBar';
import Navigation from './Navigation';
import History from './Navigation/History';
import Bookmark from './Navigation/Bookmark';
import RoutePlanner from './Route/RoutePlanner';
import Authentication from './Authentication';

// import constants
import * as STYLES from '../../Constants/styles';

// instantiate predefined styles into a constant variable
const useStyles = makeStyles((theme) => (STYLES.style));


/* *
 * Home page serves as a parent component for the multiple different subcomponents to be mounted on. UI reflected on the
 * application are divided into subcomponents and pieced together here.
 * 
 * @author Koh Tong Liang
 * @Version 2
 * @Since 31/10/2020
 * */
function Home(props) {
    const [open, setOpen] = useState(true);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* Show get location button and toggle route planner button only when not enroute to a destination
            or choosing location via map */}
            {(!props.onRoute && !props.mapPickerMode) && (
                <div>
                    <Fab className={classes.navFab} color="primary">
                        <MyLocationIcon onClick={() => props.getUserLocation()} />
                    </Fab>
                    <Fab className={classes.searchFab} color="primary">
                        <DirectionsIcon onClick={() => props.toggleRoutePlanner()} />
                    </Fab>
                    <NavBar />
                </div>
            )}

            {/* Mount all subcomponents and pass props down */}
            <Navigation {...props} />
            <Map {...props} />
            <RoutePlanner {...props} />
            <History {...props} />
            <Bookmark {...props} />
            <Authentication {...props} />

            {/* Gloabl error message snackbar for all components mounted on homeview */}
            {props.errorMessage && (
                <Snackbar
                    open={open} color='red' autoHideDuration={600} message={props.errorMessage} action={
                    <Button color="inherit" size="small" onClick={() => props.clearErrorMessage()}>
                        X
                    </Button>
                    }
                />
            )}
        </div>
    )
}

/**
 * Pass in the app state found in the store and create an object as a means for components to access the app state.
 */
const mapStateToProps = (state) => {
    const appState = {
        cameraMarkers: state.MapReducer.cameraMarkers,
        onRoute: state.NavigationReducer.onRoute,
        erpFiltered: state.NavigationReducer.erpFiltered,
        mapPickerMode: state.HomeReducer.mapPickerMode,
        errorMessage: state.HomeReducer.errorMessage,
        routePlannerView: state.NavigationReducer.routePlannerView,
        startLocation: state.NavigationReducer.startLocation,
        endLocation: state.NavigationReducer.endLocation,
        startLocationSearchResult: state.NavigationReducer.startLocationSearchResult,
        endLocationSearchResult: state.NavigationReducer.endLocationSearchResult,
        userLocation: state.HomeReducer.userLocation,
        mapPickerResult: state.HomeReducer.mapPickerResult,
        startLocationSearch: state.NavigationReducer.startLocationSearch,
        endLocationSearch: state.NavigationReducer.endLocationSearch,
        loggedIn: state.FirebaseReducer.loggedIn,
        routeInstruction: state.NavigationReducer.routeInstruction,
        stepNo: state.NavigationReducer.stepNo,
        bookmarkView: state.HomeReducer.bookmarkView,
        history: state.FirebaseReducer.history,
        user: state.FirebaseReducer.user,
        tripSummaryView: state.NavigationReducer.tripSummaryView,
        historyView: state.HomeReducer.historyView,
        signInView: state.HomeReducer.signInView,
        signInSuccess: state.FirebaseReducer.signInSuccess,
    };
    return appState;
};

/**
 * Pass in the dispatch function from Redux store and create an object that allows components to call dispatch function to dispatch specific redux actions
 */
const mapDispatchToProps = dispatch => {
    return {
        cancelRoute: () => dispatch(cancelRoute()),
        getUserLocation: () => dispatch(getUserLocation()),
        clearErrorMessage: () => dispatch(clearErrorMessage()),
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
        toggleHistoryView: () => dispatch(toggleHistoryView()),
        deleteHistory: historyId => dispatch(deleteHistory(historyId)),
        toggleBookmark: bookmark => dispatch(toggleBookmark(bookmark)),
        toggleBookmarkView: () => dispatch(toggleBookmarkView()),
        overrideUserLocation: newCoords => dispatch(overrideUserLocation(newCoords)),
        tripSummary: () => dispatch(tripSummary()),
        runHistory: dataRow => {
            dispatch(runHistory(
                {
                    routeInformation: JSON.parse(dataRow.route_information)[0],
                    startLocation: dataRow.start_location[0],
                    endLocation: dataRow.end_location[0],
                    routeName: dataRow.route_name,
                }));
            dispatch(toggleHistoryView());
        },
        runBookmark: dataRow => {
            dispatch(runHistory(
                {
                    routeInformation: JSON.parse(dataRow.route_information)[0],
                    startLocation: dataRow.start_location[0],
                    endLocation: dataRow.end_location[0],
                    routeName: dataRow.route_name,
                }));
            dispatch(toggleBookmarkView());
        },
        signIn: data => dispatch(signIn(data)),
        signUp: data => dispatch(signUp(data)),
        toggleSignInView: () => dispatch(toggleSignInView()),
    }
}

/**
 * Pass in mapStateToProps and mapDispatchToProps function into Home component as props. Components within Home component will be able to access the
 * functions to either dispatch a function or access an app state.
 */
export default connect(mapStateToProps, mapDispatchToProps)(Home);