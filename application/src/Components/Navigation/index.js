import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    Fab, Paper, Container, GridList, Switch, GridListTileBar, GridListTile,
    Button, Collapse, FormControlLabel, Typography, IconButton
} from '@material-ui/core';
import {
    MyLocation as MyLocationIcon, Directions as DirectionsIcon, Stop as StopIcon, ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { getUserLocation, toggleRoutePlanner } from '../../Action/HomeActions';
import { cancelRoute } from '../../Action/NavigationActions'

const useStyles = makeStyles((theme) => ({
    root: {
        height: 100,
        width: 100,
    },
    turnInstruction: {
        position: 'fixed',
        width: "100%",
        zIndex: '5',
        flexGrow: 1,
        textAlign: 'center',
        padding: 5,
    },
    sliderGridList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
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
        left: 10,
        width: '80%',
        position: 'fixed',
        bottom: 5,
    },
    collapseContainer: {
        display: 'flex',
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
}));

const mapStateToProps = (state) => {
    const appState = {
        cameraMarkers: state.MapReducer.cameraMarkers,
        onRoute: state.NavigationReducer.onRoute,
        erpFiltered: state.NavigationReducer.erpFiltered,
        routeInstruction: state.NavigationReducer.routeInstruction,
        stepNo: state.NavigationReducer.stepNo,
    };
    return appState;
};

function mapDispatchToProps(dispatch) {
    return {
        toggleRoutePlanner: routePlannerView => dispatch(toggleRoutePlanner(routePlannerView)),
        getUserLocation: () => dispatch(getUserLocation()),
        cancelRoute: () => dispatch(cancelRoute()),
    }
};

/* *
 * Home page is where all subcomponents will be loaded into.
 
 * @Koh Tong Liang
 * @Version 2
 * @Since 31/10/2020
 * */
function NavigationView(props) {
    /* *
    * const [x,setX] = useState() are essentially get and set for a variable/attribute
    * they will be used throughout the program as a way to store global values among some
    * of the components.
    * */
    const [showImages, setShowImages] = useState(false);
    const classes = useStyles();

    return (
        <div className={classes.root}>

            {/* Show step by step instruction given by Mapbox API */}
            {(props.routeInstruction && props.routeInstruction !== [] && props.routeInstruction.length > 0) && (
                <Paper className={classes.turnInstruction} elevation={5}>
                    <Container>
                        <Typography variant="body1" className={classes.instr}>
                            {props.routeInstruction[props.stepNo].maneuver.instruction}
                        </Typography>
                    </Container>
                </Paper>
            )}

            {/* Show Traffic images */}
            {props.onRoute && (
                <div>
                    <div className={classes.collapseContainer}>
                        <Paper className={classes.slidePanel} elevation={5}>
                            <Container>
                                {showImages === true && (
                                    <IconButton onClick={() => setShowImages(!showImages)} >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                )}
                                {showImages === false && (
                                    <IconButton onClick={() => setShowImages(!showImages)} >
                                        <ExpandLessIcon />
                                    </IconButton>
                                )}
                                <Collapse in={showImages}>
                                    <div >
                                        <Typography style={{ textAlign: 'center' }} gutterBottom variant="subtitle1">
                                            Navigating
                                        </Typography>
                                        <Paper style={{ padding: 10 }} theme="light" elevation={13} className={classes.paper}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={13} sm container>
                                                    <Grid item xs>
                                                        <Typography gutterBottom variant="subtitle3">
                                                            Next ERP zone:{(props.erpFiltered && props.erpFiltered.length > 0) && (<span>{(props.erpFiltered[0][0].length > 0) && (props.erpFiltered[0][0][0].ZoneID)}</span>)}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Typography gutterBottom variant="subtitle3">
                                                        ERP Charge S$:{(props.erpFiltered && props.erpFiltered.length > 0) && (<span>{(props.erpFiltered[0][0].length > 0) && (props.erpFiltered[0][0][0].ZoneID)}</span>)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                        <div className={classes.sliderGridList}>
                                            <GridList className={classes.gridList} cols={1}>
                                                {props.cameraMarkers.map((camera) => (
                                                    <GridListTile key={camera.camera.image}>
                                                        <img width='100%' src={camera.camera.image} alt='test' />
                                                        <GridListTileBar
                                                            title="Nearest Traffic Camera"
                                                        />
                                                    </GridListTile>
                                                ))}
                                            </GridList>
                                        </div>
                                    </div>
                                </ Collapse>
                            </Container>
                        </Paper>
                    </div>
                    <Fab className={classes.searchFab} color="secondary">
                        <StopIcon onClick={() => props.cancelRoute()} />
                    </Fab>
                </div >
            )}
        </div>
    )
}

const Navigation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavigationView);

export default Navigation;