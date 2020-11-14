// import node modules
import React from 'react';

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

// Transition element
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// instantiate predefined styles into a constant variable
const useStyles = makeStyles((theme) => (STYLES.style));





/* *
* Routeplanner component handles view pertaining to planning of route. User searches start and endlocation through different options and click
* plan route to finalize and have the mapbox API generate the route.
*
* @author Delon
* @version 2
* @since 31/10/2020
* */
function RoutePlanner(props) {
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
                                    <Card className={classes.cardRoot}>
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
                                    <Card className={classes.cardRoot}>
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
                    </form>
                </Container>
                <FormGroup className={classes.planBtn}>
                    <Button startIcon={<DirectionsCarIcon />} variant="contained" color="#1F1B24" onClick={() => props.handlePlanRoute(props.startLocationSearch, props.endLocationSearch, props.startLocation, props.endLocation)}>Plan</Button>
                </FormGroup>
            </Dialog>
        </div>
    )
}

export default RoutePlanner;