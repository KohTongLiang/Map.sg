import React, { useEffect, useState, useRef } from 'react';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'fixed',
        top: 0,
        width: "70%",
        zIndex: '5',
    },
  }));

function MapBox (props) {
    const [currentPoint, setCurrentPoint] = useState({
        lng: props.startPoint.lng,
        lat: props.startPoint.lat,
        zoom: 2,
    });
    const [destinationPoint, setDestinationPoint] = useState({
        lng: props.endPoint.lng,
        lat: props.endPoint.lat,
    });

    const [routeInstruction, setRouteInstruction] = useState([]);
    const [map, setMap] = useState(null);
    const mapContainer = useRef("");
    const marker = new mapboxgl.Marker();
    var userMarker = new mapboxgl.Marker(); // use to track user location
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

    useEffect(() => {
        if (props.startPoint !== null && props.endPoint !== null) {
            axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${props.startPoint.lng},${props.startPoint.lat};${props.endPoint.lng},${props.endPoint.lat}`,{
                params: {
                    access_token: mapboxgl.accessToken,
                    steps: true,
                    banner_instructions: true,
                    voice_instructions: true,
                    geometries: 'geojson',
                }
            }).then(function (response) {
                // console.log(response.data.routes[0].legs[0]);

                response.data.routes[0].legs[0].steps.forEach(instruction => {
                    // console.log(instruction.maneuver.instruction)
                    setRouteInstruction(routeInstruction => [...routeInstruction, instruction.maneuver.instruction]);
                });
                // display step by step instruction


                // plotting route on the map
                var coordinates = response.data.routes[0].geometry;
                console.log(coordinates);

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

                let destinationMarker = new mapboxgl.Marker();
                destinationMarker.setLngLat(props.endPoint);
                destinationMarker.addTo(map);
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
                center: [currentPoint.lng, currentPoint.lat],
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
            * on click set end point, temporarily disabled
            */
            // map.on('click', (e) => {
            //     setDestinationPoint(destinationPoint => ({
            //         lng: e.lngLat.lng,
            //         lat: e.lngLat.lat,
            //     }));
            // });
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
            marker.addTo(map);
        }
    }, [props.userLocation])

    return (
        <div>
            <div style={{ zIndex: "-1", position: "absolute", width: '100%', height: '100%', top: 0, bottom: 0}} ref={el => (mapContainer.current = el)}></div>
        </div>
    )
}

export default MapBox;