import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Fab, Paper, Container, GridList, GridListTileBar, GridListTile, Button } from '@material-ui/core';
import { MyLocation as MyLocationIcon, Directions as DirectionsIcon, Stop as StopIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { getUserLocation, toggleRoutePlanner } from '../../Action/HomeActions';
import { cancelRoute } from '../../Action/NavigationActions'
import Map from '../Map';
import RoutePlanner from '../Route/RoutePlanner';

const useStyles = makeStyles((theme) => ({
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
        width: '80%',
        left: 10,
        bottom: 50,
        position: 'fixed',
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
        };
    return appState;
};

function mapDispatchToProps (dispatch) {
    return {
        toggleRoutePlanner: routePlannerView => dispatch(toggleRoutePlanner(routePlannerView)),
        getUserLocation: () => dispatch(getUserLocation()),
        cancelRoute: () => dispatch(cancelRoute()),
    }
}

/* *
 * Home page is where all subcomponents will be loaded into.
 
 * @Koh Tong Liang
 * @Version 2
 * @Since 31/10/2020
 * */
function HomeView (props) {
    /* *
    * const [x,setX] = useState() are essentially get and set for a variable/attribute
    * they will be used throughout the program as a way to store global values among some
    * of the components.
    * */
    const [plannerDialog, setPlannerDialog] = useState(false);
    const classes = useStyles();

    // open route planner form page
    const toggleRoutePlanner = () => {
        setPlannerDialog(!plannerDialog);
        props.toggleRoutePlanner({plannerDialog});
    }

    return (
        <div>
            {props.onRoute && (
                <div>
                    <Paper className={classes.slidePanel} elevation={5}>
                        <Container>
                            <h4>Route in Progress</h4>
                            <div className={classes.sliderGridList}>
                                <GridList className={classes.gridList} cols={2.5}>
                                    {props.cameraMarkers.map((camera) => (
                                    <GridListTile key={camera.camera.image}>
                                        <img src={camera.camera.image} alt='test' />
                                    </GridListTile>
                                    ))}
                                </GridList>
                            </div>
                        </Container>
                    </Paper>

                    <Fab className={classes.searchFab} color="secondary">
                        <StopIcon onClick={() => props.cancelRoute()}/>
                    </Fab>
                </div>
            )}

            <Fab className={classes.navFab} color="primary">
                <MyLocationIcon onClick={() => props.getUserLocation()} />
            </Fab>
            {!props.onRoute && (
                <div>

                    <Fab className={classes.searchFab} color="primary">
                        <DirectionsIcon onClick={() => toggleRoutePlanner()}/>
                    </Fab>
                </div>
            )}

            <Map/>
            <RoutePlanner toggleRoutePlanner={toggleRoutePlanner}/>
        </div>
    )
}

const Home = connect(
    mapStateToProps,
    mapDispatchToProps,
    )(HomeView);

export default Home;