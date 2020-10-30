import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import axios from 'axios';
import { Typography, Container, Input, Slide,
    Dialog, Button, FormGroup, FormControl, InputLabel, IconButton, Toolbar,
    AppBar, FormLabel } from '@material-ui/core';
import { MyLocation as MyLocationIcon, Directions as DirectionsIcon,
Close as CloseIcon, Search as SearchIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { searchStartLocation, searchEndLocation } from '../../Action/NavigationActions';

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

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

const mapStateToProps = (state) => {
    const appState = {
            routePlannerView: state.HomeReducer.routePlannerView,
            startLocation: state.NavigationReducer.startLocation,
            startLocationSearchResult: state.NavigationReducer.startLocationSearchResult,
            endLocationSearchResult: state.NavigationReducer.endLocationSearchResult,
        };
    return appState;
};

function mapDispatchToProps (dispatch) {
    const actions = {
        searchStartLocation: startLocation => dispatch(searchStartLocation()),
        searchEndLocation: endLocationSearch => dispatch(searchEndLocation()),
    };
    return actions;
}

/* *
* Routeplanner component that handle planning of route. User searches start and endlocation
* and the data is stored in hooks and returned to the main component
* 
* @Koh Tong Liang
* @Version 1.0
* @Since 19/10/2020
* */
function RoutePlannerView (props) {
    const [startLocationSearch, setStartLocationSearch] = useState('');
    const [endLocationSearch, setEndLocationSearch] = useState('');
    const [startLocationSearchResult, setStartLocationSearchResult] = useState([]);
    const [endLocationSearchResult, setEndLocationSearchResult] = useState([]);
    const [selectedStartLocation, setSelectedStartLocation] = useState(null);
    const [selectedEndLocation, setSelectedEndLocation] = useState(null);
    const accessToken = process.env.REACT_APP_MAPBOX_KEY;
    const classes = useStyles();

    // temporary
    // useEffect(() => {
    //     if (props.userLocation.lng !== 0) {
    //         setStartLocationSearch(props.userLocation.lng + " : " + props.userLocation.lat);
    //     }
    // }, [props.userLocation])

    // TO SHIFT TO BACKEND
    const searchStartLocation = () => {
        // axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${startLocationSearch}.json`,{
        //     params: {
        //         access_token: accessToken,
        //     }
        // }).then(function (response) {
        //     // response.data.features contains array of possible location that the entered text referred to.
        //     var result = response.data.features;
        //     setStartLocationSearchResult(result);
        // });
        props.searchStartLocation(startLocationSearch);
        // console.log(props.startLocationSearchResult);
    }

    // to shift to backend
    const searchEndLocation = () => {
        // axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${endLocationSearch}.json`,{
        //     params: {
        //         access_token: accessToken,
        //         country: "sg"
        //     }
        // }).then(function (response) {
        //     // response.data.features contains array of possible location that the entered text referred to.
        //     var result = response.data.features;
        //     setEndLocationSearchResult(result);
        // });
        
        props.searchEndLocation(endLocationSearch);
    }

   /* *
    * 
    * When user select the location they want, the coordinates is stored in hooks and later
    * retrieved for route searching
    * 
    * @Koh Tong Liang
    * @Version 1.0
    * @Since 19/10/2018
    * */
    const processStartLocation = (geometryArr, placeName) => {
        setSelectedStartLocation({
            lng: geometryArr[0],
            lat: geometryArr[1]
        });
        setStartLocationSearchResult([]);
        setStartLocationSearch(placeName);
    }

    const processEndLocation = (geometryArr, placeName) => {
        setSelectedEndLocation({
            lng: geometryArr[0],
            lat: geometryArr[1]
        });
        setEndLocationSearchResult([]);
        setEndLocationSearch(placeName);
    }

    return (
        <Dialog
            fullScreen
            open={props.routePlannerView}
            // TransitionComponent={Transition}
            keepMounted
            onClose={() => props.toggleRoutePlanner()}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => props.toggleRoutePlanner()}  aria-label="close">
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
                            <InputLabel>Start Location</InputLabel>
                            <Input name="startLocation" value={startLocationSearch} onChange={e => setStartLocationSearch(e.target.value)}/>
                            <IconButton color="inherit" onClick={() => searchStartLocation()} aria-label="Search">
                                <SearchIcon/>
                            </IconButton>
                            <Button color="inherit" onClick={() => alert()}>Use Current Location</Button>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            {props.startLocationSearchResult && props.startLocationSearchResult.map(r => (
                                <Button onClick={() => alert()}>{r.place_name}</Button>
                            ))}
                        </FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormControl>
                            <InputLabel>End Location</InputLabel>
                            <Input name="endLocation" value={endLocationSearch} onChange={e => setEndLocationSearch(e.target.value)}/>
                            <IconButton color="inherit" onClick={() => searchEndLocation()} aria-label="Search">
                                <SearchIcon/>
                            </IconButton>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            {props.endLocationSearchResult && props.endLocationSearchResult.map(r => (
                                <Button onClick={() => alert()}>{r.place_name}</Button>
                            ))}
                        </FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <Button color="inherit" onClick={() => alert()}>Plan</Button>
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