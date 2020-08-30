import React, { useState } from 'react';

import GoogleMapReact from 'google-map-react';
import { Paper } from '@material-ui/core';

function Map (props) {
    const [center, setCenter] = useState({ lat: 1.3483, lng: 103.6831});
    const [zoom, setZoom] = useState(16);

    const handleApiLoaded = (map, maps) => {
        const directionsService = new maps.DirectionsService();
        const directionsDisplay = new maps.DirectionsRenderer();

        directionsService.route({
            origin: props.startPoint,
            destination: props.endPoint,
            travelMode: 'DRIVING',
        }, (response, status) => {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);

                const routePolyLine = new window.google.maps.Polyline({
                    path: response.routes[0].overview_path,
                });
                routePolyLine.setMap(map);
            } else {
                console.log("error " + status);
            }
        });
    };

    return(
        <div style={{ height: '100vh', width: '100%', position: 'absolute', zIndex: '0'}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBed41-9qlm6P_AU5Iu28sRpTA8ZO6Vytw" }}
                defaultCenter={center}
                defaultZoom={zoom}
                yesIWantToUseGoogleMapApiInternals 
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >
            </GoogleMapReact>
        </div>
    )
}

export default Map;