import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Typography, Container, Input, Slide,
    Dialog, Button, FormGroup, FormControl, InputLabel, IconButton, Toolbar,
    AppBar, FormLabel } from '@material-ui/core';
import { MyLocation as MyLocationIcon, Directions as DirectionsIcon,
Close as CloseIcon, Search as SearchIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function RoutePlanner (props) {
    const [startLocationSearch, setStartLocationSearch] = useState('');
    const [endLocationSearch, setEndLocationSearch] = useState('');
    const [startLocationSearchResult, setStartLocationSearchResult] = useState([]);
    const [endLocationSearchResult, setEndLocationSearchResult] = useState([]);
    const [selectedStartLocation, setSelectedStartLocation] = useState(null);
    const [selectedEndLocation, setSelectedEndLocation] = useState(null);
    const accessToken = process.env.REACT_APP_MAPBOX_KEY;

    // temporary
    useEffect(() => {
        if (props.userLocation.lng !== 0) {
            setStartLocationSearch(props.userLocation.lng + " : " + props.userLocation.lat);
        }
    }, [props.userLocation])

    const searchStartLocation = () => {
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${startLocationSearch}.json`,{
            params: {
                access_token: accessToken,
            }
        }).then(function (response) {
            // response.data.features contains array of possible location that the entered text referred to.
            var result = response.data.features;
            setStartLocationSearchResult(result);
        });
    }

    const searchEndLocation = () => {
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${endLocationSearch}.json`,{
            params: {
                access_token: accessToken,
                country: "sg"
            }
        }).then(function (response) {
            // response.data.features contains array of possible location that the entered text referred to.
            var result = response.data.features;
            setEndLocationSearchResult(result);
        });
    }

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

    const userLocationAsStart = () => {
        props.getUserLocation();
    }

    const planRoute = () => {
        props.routeHandler(selectedStartLocation, selectedEndLocation);
        props.toggleDialog();
    }

    return (
        <Dialog
            fullScreen
            open={props.plannerDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.toggleDialog}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <AppBar className={props.classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.toggleDialog} aria-label="close">
                    <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={props.classes.title}>
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
                            <Button color="inherit" onClick={() => userLocationAsStart()}>Use Current Location</Button>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            {startLocationSearchResult && startLocationSearchResult.map(r => (
                                <Button onClick={() => processStartLocation(r.geometry.coordinates, r.place_name)}>{r.place_name}</Button>
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
                            {endLocationSearchResult && endLocationSearchResult.map(r => (
                                <Button onClick={() => processEndLocation(r.geometry.coordinates, r.place_name)}>{r.place_name}</Button>
                            ))}
                        </FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <Button color="inherit" onClick={() => planRoute()}>Plan</Button>
                    </FormGroup>
                </form>
            </Container>
        </Dialog>
    )
}

export default RoutePlanner;