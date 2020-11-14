// import node modules
import React, { useState } from 'react';

// import material-ui modules
import {
    Fab, Paper, Container, GridList, GridListTileBar, GridListTile,
    Collapse, Typography, IconButton, Grid
} from '@material-ui/core';
import {
    Stop as StopIcon, ExpandLess as ExpandLessIcon, 
    ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';


// import constants
import * as STYLES from '../../Constants/styles';

// instantiate predefined styles into a constant variable
const useStyles = makeStyles((theme) => (STYLES.style));

/* *
 * Navigation view contains views pertaining route planning and displaying on route data
 * @author Koh Tong Liang
 * @version 2
 * @since 31/10/2020
 * */
function Navigation(props) {
    const [showImages, setShowImages] = useState(true);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* Show step by step instruction given by Mapbox API if any */}
            {(props.routeInstruction && props.routeInstruction !== [] && props.routeInstruction.length > 0) && (
                <Paper className={classes.turnInstruction} elevation={5}>
                    <Container>
                        <Typography variant="body1" className={classes.instr}>
                            {props.routeInstruction[props.stepNo].maneuver.instruction}
                        </Typography>
                    </Container>
                </Paper>
            )}
            {/* Show Traffic images if any */}
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
                                                        ERP Charge S$:{(props.erpFiltered && props.erpFiltered.length > 0) && (<span>{(props.erpFiltered[0][0].length > 0) && (props.erpFiltered[0][0][0].ChargeAmount)}</span>)}
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

export default Navigation;