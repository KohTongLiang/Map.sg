import React, { useEffect, useState, useRef } from 'react';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

const API_KEY = process.env.REACT_APP_MAPBOX_KEY;
mapboxgl.accessToken = API_KEY;

function MapBox (props) {
    const [currentPoint, setCurrentPoint] = useState({
        lng: props.startPoint.lng,
        lat: props.startPoint.lat,
        zoom: 2,
    })

    const mapContainer = useRef("");
    const map = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [props.startPoint.lng, props.startPoint.lat],
            zoom: 12
        });

        map.on('move', () => {
            setCurrentPoint({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2),
            })
        });

        const directions = new MapboxDirections({
            accessToken: API_KEY,
            alternatives: true,
            steps: true,
            banner_instructions: true,
            voice_instructions: true,
            unit: 'metric',
            profile: 'mapbox/driving'
        });
        
        map.addControl(directions, 'top-left');
        console.log(directions);
      
    },[]);

    return (
        <div>
            <div style={{position: "absolute", top: 0, right: 0, left: 0, bottom: 0}} ref={el => (mapContainer.current = el)}></div>
        </div>
    )
}

export default MapBox;