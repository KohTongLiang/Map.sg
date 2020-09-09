import React, { useState } from 'react';
import { Fab, Typography, Container, Box, Input } from '@material-ui/core';
import { Create as CreateIcon } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import MapBoxTest from '../Map';

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: 0,
        top: '80vh',
        left: '80vh',
        position: 'fixed',
        zIndex: '10',
    },
}));

function Home (props) {
    const [startLat, setStartLat] = useState(1.3483);
    const [startLng, setStartLng] = useState(103.6831);
    const [endLat, setEndLat] = useState(1.5563);
    const [endLng, setEndLng] = useState(103.6631);

    const classes = useStyles();
    return (
        <Box>
            <MapBoxTest startPoint={{lat: startLat, lng: startLng}} endPoint={{lat: endLat, lng: endLng}} />
        
            <Fab className={classes.className} color="primary">
                <CreateIcon />
            </Fab>
            
        </Box>
    )
}

export default Home;