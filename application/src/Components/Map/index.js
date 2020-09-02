import React, { useEffect, useState, useRef } from 'react';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'


function MapBox (props) {
    const [currentPoint, setCurrentPoint] = useState({
        lng: props.startPoint.lng,
        lat: props.startPoint.lat,
        zoom: 2,
    })
    const [map, setMap] = useState(null);
    const mapContainer = useRef("");
    const marker = new mapboxgl.Marker();

    useEffect(() => {
        window.navigator.geolocation.watchPosition(position => {
            setCurrentPoint(currentPoint, ({ lng: position.coords.longitude, lat: position.coords.latitude }));

            marker.setLngLat({ lng: currentPoint.lng, lat: currentPoint.lat});
            console.log(map);
        });
    }, [currentPoint])

    // mount map and initialize it.
    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
        const initializeMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
                center: [currentPoint.lng, currentPoint.lat],
                zoom: 12,
            });

            marker.setLngLat({ lng: currentPoint.lng, lat: currentPoint.lat});
            marker.addTo(map);
        
            map.on("load", () => {
                setMap(map);
                map.resize();
            });

            map.on('move', () => {
                setCurrentPoint(currentPoint => ({
                    lng: map.getCenter().lng.toFixed(4),
                    lat: map.getCenter().lat.toFixed(4),
                    zoom: map.getZoom().toFixed(2),
                }));
            });

            const directions = new MapboxDirections({
                accessToken: mapboxgl.accessToken,
                alternatives: true,
                steps: true,
                banner_instructions: true,
                voice_instructions: true,
                unit: 'metric',
                profile: 'mapbox/driving'
            });
            
            map.addControl(directions, 'top-left');
        };

        if (!map) initializeMap({ setMap, mapContainer });
    },[map]);

    return (
        <div>
            <div style={{position: "absolute", top: 0, right: 0, left: 0, bottom: 0}} ref={el => (mapContainer.current = el)}></div>
            <p>latitude {currentPoint.lat}</p>
            <p>longtitude {currentPoint.lng}</p>
        </div>
    )
}

export default MapBox;