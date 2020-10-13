import React, { useState, useEffect } from 'react';
import { Fab, Paper, Container } from '@material-ui/core';
import { MyLocation as MyLocationIcon, Directions as DirectionsIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import Map from '../Map';
import RoutePlanner from './RoutePlanner';


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
    const [startLocation, setStartLocation] = useState({});
    const [endLocation, setEndlocation] = useState({});
    const [plannerDialog, setPlannerDialog] = useState(false);
    const [userLocation, setUserLocation] = useState({lng: 0, lat: 0});
    const classes = useStyles();

    // check userlocation change
    useEffect(() => {
        //console.log(userLocation);
    }, [userLocation])

    const getUserLocation = () => {
        window.navigator.geolocation.watchPosition(position => {
            // to be modified
            setUserLocation(userLocation => ({ lng: position.coords.longitude, lat: position.coords.latitude }));
            setStartLocation(startLocation => ({ lng: position.coords.longitude, lat: position.coords.latitude }));
        });
    };

    const planTrip = () => {
        setPlannerDialog(true);
    }

    const dialogHandler = () => {
        setPlannerDialog(!plannerDialog);
    }

    const routeHandler = (startObj, endObj) => {

        // null case where user location is used instead
        if (startObj !== null) {
            setStartLocation(startObj);
        }

        if (endObj !== null) {
            setEndlocation(endObj);
        }
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

            <Map userLocation={userLocation} startPoint={startLocation} endPoint={endLocation} />

            <RoutePlanner userLocation={userLocation} plannerDialog={plannerDialog} toggleDialog={dialogHandler}
                getUserLocation={() => getUserLocation()} routeHandler={routeHandler} classes={classes} />
        </div>
    )
}

export default Home;