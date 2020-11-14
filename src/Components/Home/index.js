// import node modules
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Fab } from '@material-ui/core';

// import redux components
import { getUserLocation, toggleRoutePlanner, clearErrorMessage } from '../../Action/HomeActions';
import { cancelRoute } from '../../Action/NavigationActions'

// import material-ui modules
import { MyLocation as MyLocationIcon, Directions as DirectionsIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Snackbar } from '@material-ui/core';

// import view components
import Map from '../Map';
import NavBar from '../NavBar';
import Navigation from '../Navigation';
import History from '../Navigation/History';
import Bookmark from '../Navigation/Bookmark';
import RoutePlanner from '../Route/RoutePlanner';

// import constants
import * as STYLES from '../../Constants/styles';

// instantiate predefined styles into a constant variable
const useStyles = makeStyles((theme) => (STYLES.style));

// allows states stored in redux store to be mapped to components
const mapStateToProps = (state) => {
    const appState = {
        cameraMarkers: state.MapReducer.cameraMarkers,
        onRoute: state.NavigationReducer.onRoute,
        erpFiltered: state.NavigationReducer.erpFiltered,
        mapPickerMode: state.HomeReducer.mapPickerMode,
        errorMessage: state.HomeReducer.errorMessage,
    };
    return appState;
};

// allows view to call redux actions to perform a particular task
function mapDispatchToProps(dispatch) {
    return {
        toggleRoutePlanner: () => dispatch(toggleRoutePlanner()),
        cancelRoute: () => dispatch(cancelRoute()),
        getUserLocation: () => dispatch(getUserLocation()),
        clearErrorMessage: () => dispatch(clearErrorMessage()),
    }
}

/* *
 * Home page serves as a parent component for the multiple different subcomponents to be mounted on. UI reflected on the
 * application are divided into subcomponents and pieced together here.
 * @author Koh Tong Liang
 * @Version 2
 * @Since 31/10/2020
 * */
function HomeView(props) {
    /* *
       * const [x,setX] = useState() are essentially get and set for a variable/attribute
       * they will be used throughout the program as a way to store global values among some
       * of the components.
       * */
    const [open, setOpen] = useState(true);
    const classes = useStyles();

    return (
        <div className={classes.root}>
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
            <Navigation />
            <Map />
            <RoutePlanner />
            <History />
            <Bookmark />
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

// bridge the view to redux actions and store
const Home = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeView);

export default Home;