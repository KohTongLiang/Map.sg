import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container, IconButton, Typography } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'fixed',
        width: "100%",
        zIndex: '5',
        flexGrow: 1,
    },
    instr: {
        flexGrow: 1,
    },
    stepsButton: {
        marginRight: theme.spacing(2),
    },
  }));

function MapBoxView ({routeInstruction, passStepNo, mapContainer}) {
    // const [routeInstruction, setRouteInstruction] = useState(routeInstruction);
    const [stepNo, setStepNo] = useState(passStepNo);
    // const mapContainer = mapContainer
    // const routeInstruction = props.routeInstruction;
    // const stepNo = props.stepNo;
    const classes = useStyles();

    return (
        <div>
            {(routeInstruction && routeInstruction.length > 0) && (
                <Paper className={classes.paper} elevation={5}>
                    <IconButton className={classes.stepsButton} color="inherit" onClick={() => stepNo > 0 ? setStepNo(stepNo => stepNo - 1) : stepNo}>
                        <ChevronLeft/>
                    </IconButton>
                    <Typography variant="p" className={classes.instr}>
                        {routeInstruction[stepNo].maneuver.instruction}
                    </Typography>
                    <IconButton className={classes.stepsButton} color="inherit" onClick={() => stepNo < routeInstruction.length - 1 ? setStepNo(stepNo => stepNo + 1) : stepNo}>
                        <ChevronRight/>
                    </IconButton>
                </Paper>
            )}

            <div style={{ zIndex: "-1", position: "absolute", width: '100%', height: '100%', top: 0, bottom: 0}} ref={el => (mapContainer.current = el)}></div>
        </div>
    )
}

export default MapBoxView;