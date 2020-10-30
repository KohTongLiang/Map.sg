import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Fab, Paper, Container } from '@material-ui/core';
import { MyLocation as MyLocationIcon, Directions as DirectionsIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { toggleRoutePlanner } from '../../Action/HomeActions';
import Map from '../Map';
import RoutePlanner from '../Route/RoutePlanner';

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

function mapDispatchToProps (dispatch) {
    return {
        toggleRoutePlanner: routePlannerView => dispatch(toggleRoutePlanner(routePlannerView)),
    }
}

/* *
 * 
 * Home page is where all subcomponents will be loaded into.
 * 
 * @Koh Tong Liang
 * @Version 1.0
 * @Since 19/10/2018
 * */
function HomeView (props) {
    /* *
    * const [x,setX] = useState() are essentially get and set for a variable/attribute
    * they will be used throughout the program as a way to store global values among some
    * of the components.
    * */
    const [startLocation, setStartLocation] = useState({});
    const [endLocation, setEndlocation] = useState({});
    const [plannerDialog, setPlannerDialog] = useState(false);
    const [userLocation, setUserLocation] = useState({lng: 0, lat: 0});
    const classes = useStyles();

   /* *
    * 
    * Actions which will be taken here when user location is changed
    * 
    * @Koh Tong Liang
    * @Version 1.0
    * @Since 19/10/2018
    * */
    useEffect(() => {
        //console.log(userLocation);
    }, [userLocation])

   /* *
    * Calls browser location service to constantly watch user's location and update
    * the hooks storing userlocation
    * 
    * @Koh Tong Liang
    * @Version 1.0
    * @Since 19/10/2018
    * */
    const getUserLocation = () => {
        window.navigator.geolocation.watchPosition(position => {
            // to be modified
            setUserLocation(userLocation => ({ lng: position.coords.longitude, lat: position.coords.latitude }));
            setStartLocation(startLocation => ({ lng: position.coords.longitude, lat: position.coords.latitude }));
        });
    };

    // debug function to forcefully override user current location
    const debugOverrideUserLocation = lngLat => {
        setUserLocation(userLocation => lngLat);
    }

    const planTrip = () => {
        setPlannerDialog(true);
    }

    const dialogHandler = () => {
        setPlannerDialog(!plannerDialog);
    }

 /* *
    * Once user has selected the starting location and ending location,
    * the values are validated and stored in hooks.
    * 
    * @Koh Tong Liang
    * @Version 1.0
    * @Since 19/10/2018
    * */
    const routeHandler = (startObj, endObj) => {
        // null case where user location is used instead
        if (startObj !== null) {
            setStartLocation(startObj);
        }

        if (endObj !== null) {
            setEndlocation(endObj);
        }
    }

    // open route planner form page
    const toggleRoutePlanner = () => {
        setPlannerDialog(!plannerDialog);
        props.toggleRoutePlanner({plannerDialog});
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
                <DirectionsIcon onClick={() => toggleRoutePlanner()}/>
            </Fab>

            {/* added debug function */}
            <Map userLocation={userLocation} startPoint={startLocation} endPoint={endLocation}
                debugOverrideUserLocation={debugOverrideUserLocation} />

            <RoutePlanner toggleRoutePlanner={toggleRoutePlanner}/>
        </div>
    )
}

const Home = connect(
    null,
    mapDispatchToProps,
    )(HomeView);

export default Home;