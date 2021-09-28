// import node modules
import React, { useEffect, useState, useRef } from 'react';

// import map context
import MapContext from '../../Context';

// import material-ui modules
import { Container, Slide, Dialog, Button} from '@material-ui/core';

// import mapbox modules
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

// import custom functional components
import MapFunctions from '../../Custom/MapFunctions';

// transition element used for animating components
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


/* *
   * Map view is mounted as a subcomponent on the home view. It reflects any changes pertaining user location, traffic images, ERP information and route information.
   * Separate functional components may be used to handled business logic pertaining to the map view by passing the map object into the components.
   * 
   * @author Koh Tong Liang
   * @version 1.0
   * @since 19/10/2018
   * */
function MapBox(props) {
    // we create a map object and store its properties in a hook so that it can be accessed/modified
    const [map, setMap] = useState(null);
    const mapContainer = useRef("");
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

  /* *
     * On componenent mount/First render
     * Create a map object and render it on a div when Map component is mounted on home view.
     * */
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

                // Code for making the buildings look 3D on the map
                map.addLayer({
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
        };

        if (!map) {
            // if map not yet initialized, initialize it
            initializeMap({ setMap, mapContainer });
        }
    }, [map]);

    return (
        <div>
            <div style={{ zIndex: "-1", position: "absolute", width: '100%', height: '100%', top: 0, bottom: 0 }} ref={el => (mapContainer.current = el)}></div>
            <Dialog
                open={props.tripSummaryView}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => props.tripSummary()}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <Container>
                    <form>
                        <Button onClick={() => props.tripSummary()}>You have reached your end point.</Button>
                    </form>
                </Container>
            </Dialog>

             {/* 
                We create a map context with map object and wrap any functions that we want to use to update/manipulate map properties inside the context
              */}
            <MapContext.Provider value={map}>
                {/* Custom functions */}
                <MapFunctions />
                {/* Future functions can be added on within the wrapper */}
            </MapContext.Provider>
        </div>
    )
}

export default MapBox;