import React, { useEffect, useState, useRef } from 'react';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import axios from 'axios';
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

function MapBox (props) {
    const [currentPoint, setCurrentPoint] = useState({});
    const [destinationPoint, setDestinationPoint] = useState({});
    const [routeInstruction, setRouteInstruction] = useState(null);
    const [ongoingTrip, setOngoingTrip] = useState(false);
    const [stepNo, setStepNo] = useState(null);
    const [route, setRoute] = useState(null);
    const [map, setMap] = useState(null);
    const [stepMarkers, setStepMarkers] = useState([]);
    const mapContainer = useRef("");
    var marker = new mapboxgl.Marker();
    var userMarker = new mapboxgl.Marker(); // use to track user location
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
    const classes = useStyles();

    useEffect(() => {
        if (props.startPoint !== {} && props.endPoint !== {}) {
            axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${props.startPoint.lng},${props.startPoint.lat};${props.endPoint.lng},${props.endPoint.lat}`,{
                params: {
                    access_token: mapboxgl.accessToken,
                    steps: true,
                    banner_instructions: true,
                    voice_instructions: true,
                    geometries: 'geojson',
                }
            }).then(function (response) {
                //console.log(response.data.routes[0].legs[0]);

                // setting up path
                setStepNo(0);
                setRouteInstruction([]);
                var steps = 1;
                response.data.routes[0].legs[0].steps.forEach(instruction => {
                    var el = document.createElement('div');
                    el.className = 'marker';
                    // el.style.backgroundImage = 'url(https://placekitten.com/g/120/120/)';
                    el.style.backgroundColor = "black";
                    el.style.textAlign = "center";
                    el.textContent = steps;
                    el.style.width = '30px';
                    el.style.height = '30px';
                    // el.addEventListener('click', function () {
                    //     window.alert(instruction.maneuver.instruction);
                    // });

                    let step = new mapboxgl.Marker(el);
                    step.setLngLat(instruction.maneuver.location);
                    step.addTo(map);
                    setRouteInstruction(routeInstruction => [...routeInstruction, instruction]);
                    setStepMarkers(stepMarkers => [...stepMarkers, step]);
                    steps++;
                });

                // display step by step instruction
                // plotting route on the map
                console.log(response.data.routes);
                var coordinates = response.data.routes[0].geometry;
                setRoute(coordinates);

                map.addSource('LineString', {
                    'type': 'geojson',
                    'data': coordinates
                });

                map.addLayer({
                    'id': 'LineString',
                    'type': 'line',
                    'source': 'LineString',
                    'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                    },
                    'paint': {
                    'line-color': '#BF93E4',
                    'line-width': 5
                    }
                });

                let startMarker = new mapboxgl.Marker();
                startMarker.setLngLat(props.startPoint);
                startMarker.addTo(map);

                let destinationMarker = new mapboxgl.Marker();
                destinationMarker.setLngLat(props.endPoint);
                destinationMarker.addTo(map);

                setUpTrafficImages();
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, [props.endPoint]);

    useEffect(() => {
        // init map function
        const initializeMap = ({ setMap, mapContainer }) => {

            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
                center: [103.6831, 1.3483],
                zoom: 17,
                pitch: 45,
            });
        
            map.on("load", () => {
                // Insert the layer beneath any symbol layer.
                var layers = map.getStyle().layers;
                var labelLayerId;
                for (var i = 0; i < layers.length; i++) {
                    if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                        labelLayerId = layers[i].id;
                        break;
                    }
                }
                
                // Code for making the buildings look  3D on the map
                map.addLayer(
                {
                    'id': '3d-buildings',
                    'source': 'composite',
                    'source-layer': 'building',
                    'filter': ['==', 'extrude', 'true'],
                    'type': 'fill-extrusion',
                    'minzoom': 15,
                    'paint': {
                    'fill-extrusion-color': '#aaa',
                    
                    // use an 'interpolate' expression to add a smooth transition effect to the
                    // buildings as the user zooms in
                    'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'height']
                    ],
                    'fill-extrusion-base': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'min_height']
                    ],
                    'fill-extrusion-opacity': 0.6
                    }
                }, labelLayerId);

                setMap(map);
                map.resize();
            });

            /*
            * FOR DEBUGGING and DEMO only
            * on click set user current location
            * used as temporary override user location
            */
            map.on('click', (e) => {
                props.debugOverrideUserLocation({
                    lng: e.lngLat.lng,
                    lat: e.lngLat.lat,
                });
            });
        };

        if (!map) {
            // if map not yet initialized, initialize it
            initializeMap({ setMap, mapContainer });
        }
    },[map, currentPoint, destinationPoint]);

    useEffect(() => {
        if (map != null) {
            map.flyTo({
                center: [props.userLocation.lng, props.userLocation.lat]
            });


            marker.setLngLat([props.userLocation.lng, props.userLocation.lat]);

            console.log(stepMarkers);

            if (marker !== undefined && stepMarkers[stepNo] !== undefined) {
                if ((marker.getLngLat().lng - stepMarkers[stepNo].getLngLat().lng <= 1 ||
                    marker.getLngLat().lng - stepMarkers[stepNo].getLngLat().lng >= -1) &&
                    (marker.getLngLat().lat - stepMarkers[stepNo].getLngLat().lat <= 1 ||
                    marker.getLngLat().lat - stepMarkers[stepNo].getLngLat().lat >= -1)) {
                    stepMarkers[stepNo].remove();
                    setStepNo(stepNo => stepNo + 1);
                }
            }
            
            // console.log(marker.getLngLat());
            marker.addTo(map);
        }
    }, [props.userLocation])

    const setUpTrafficImages = () => {
        axios.get('https://api.data.gov.sg/v1/transport/traffic-images').then(function (response) {
            // console.log(response.data.items);

            response.data.items[0].cameras.map(camera => {
                var el = document.createElement('img');
                el.className = 'marker';
                el.src = camera.image;
                // el.style.backgroundImage = camera.image;
                el.style.width = '120px';
                el.style.height = '120px';
                // el.addEventListener('click', function () {
                //     window.alert(instruction.maneuver.instruction);
                // });

                let stepMarkers = new mapboxgl.Marker(el);
                stepMarkers.setLngLat([camera.location.longitude, camera.location.latitude]);
                stepMarkers.addTo(map);
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

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

export default MapBox;