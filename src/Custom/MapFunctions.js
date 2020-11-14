// import node modules
import React, { useEffect, useState, useContext } from 'react';
import * as turf from '@turf/turf';
import { connect } from "react-redux";

// import map context
import MapContext from '../Context';

// import gantry coordinates from json data
import { GantryCoordinates } from '../json/GantryCoordinates';

// import redux components
import { overrideUserLocation, toggleRoutePlanner,toggleMapPicker, returnMapPickerResult } from '../Action/HomeActions';
import { getTrafficImages, getErpData, updateCameraMarkers, updateLineString, updateNextCamera } from '../Action/MapActions';
import { tripSummary, mapMatching, updateSteps, reroute, planRoute, cancelRoute, processEndLocation,
    processStartLocation, filterRouteErp } from '../Action/NavigationActions';
import { loadHistory, saveHistory } from '../Action/FirebaseAction';

// import mapbox modules
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

// allows states stored in redux store to be mapped to components
const mapStateToProps = (state) => {
    const appState = {
        userLocation: state.HomeReducer.userLocation,
        navigationRoute: state.NavigationReducer.navigationRoute,
        startLocation: state.NavigationReducer.startLocation,
        endLocation: state.NavigationReducer.endLocation,
        mapMatchedRoute: state.NavigationReducer.mapMatchedRoute,
        cameras: state.MapReducer.cameras,
        ERP: state.MapReducer.ERP,
        cameraMarkers: state.MapReducer.cameraMarkers,
        stepNo: state.NavigationReducer.stepNo,
        routeInstruction: state.NavigationReducer.routeInstruction,
        lineString: state.MapReducer.lineString,
        onRoute: state.NavigationReducer.onRoute,
        user: state.FirebaseReducer.user,
        routeName: state.NavigationReducer.routeName,
        tripSummaryView: state.NavigationReducer.tripSummaryView,
        mapPickerMode: state.NavigationReducer.mapPickerMode,
    };
    return appState;
};

// allows view to call redux actions to perform a particular task
function mapDispatchToProps(dispatch) {
    return {
        overrideUserLocation: newCoords => dispatch(overrideUserLocation(newCoords)),
        getTrafficImages: () => dispatch(getTrafficImages()),
        getErpData: () => dispatch(getErpData()),
        tripSummary: () => dispatch(tripSummary()),
        mapMatching: routeCoordinates => dispatch(mapMatching(routeCoordinates)),
        updateCameraMarkers: cameraMarker => dispatch(updateCameraMarkers(cameraMarker)),
        updateSteps: stepNo => dispatch(updateSteps(stepNo)),
        updateLineString: lineString => dispatch(updateLineString(lineString)),
        reroute: (userLocation, endLocation) => dispatch(reroute(userLocation, endLocation)),
        planRoute: (startLocation, endLocation) => dispatch(planRoute(startLocation, endLocation)),
        cancelRoute: () => dispatch(cancelRoute()),
        processStartLocation: startLocation => dispatch(processStartLocation(startLocation)),
        processEndLocation: endLocation => dispatch(processEndLocation(endLocation)),
        updateNextCamera: cameraArr => dispatch(updateNextCamera(cameraArr)),
        filterRouteErp: filteredErp => dispatch(filterRouteErp(filteredErp)),
        saveHistory: route => dispatch(saveHistory(route)),
        loadHistory: userId => dispatch(loadHistory(userId)),
        tripSummary: () => dispatch(tripSummary()),
        toggleRoutePlanner: () => dispatch(toggleRoutePlanner()),
        toggleMapPicker: () => dispatch(toggleMapPicker()),
        returnMapPickerResult: payload => dispatch(returnMapPickerResult(payload)),
    }
}



/* *
   * Custom functions used to manipulate/modify map properties
   * 
   * @author Koh Tong Liang
   * @version 1.0
   * @since 19/10/2018
   * */
function MapFunctions(props) {
    // retrieve map object from context
    const map = useContext(MapContext);

    // define local variables/hooks
    const [stepMarkers, setStepMarkers] = useState([]);
    const [erpMarkers, setErpMarkers] = useState([]);
    const [pinnedCameraMarkers, setPinnedCameraMarkers] = useState([]);
    const [userMarker, setUserMarker] = useState(null);
    var marker = new mapboxgl.Marker();
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

    useEffect(() => {
        props.getErpData();
        props.getTrafficImages();
    }, []);

    useEffect(() => {
        if (props.user !== null) {
            props.loadHistory({ userId: props.user.uid });
        }
    }, [props.user])

    useEffect(() => {
        if (props.mapPickerMode > 0) {
            map.on('click', (e) => {
                props.returnMapPickerResult([{lng: e.lngLat.lng, lat: e.lngLat.lat}]);
            });
        } else if (map !== null) {
            /**
             * Reset DEBUGGING action listener
             */
            map.on('click', (e) => {
                /*
                * FOR DEBUGGING and DEMO only
                * on click set user current location
                * used as temporary override user location
                */
                props.overrideUserLocation({
                    lng: e.lngLat.lng,
                    lat: e.lngLat.lat,
                });
            });
        }
    }, [props.mapPickerMode])

 /* *
    * USER LOCATION CHANGE
    * When userlocation change, detect if user has reach waypoint, if user has reach the
    * waypoint, remove the marker on the waypoint and progress to next step in step by step
    * instruction
    * 
    * @Koh Tong Liang
    * @Version 1.0
    * @Since 19/10/2020
    * */
    useEffect(() => {
        if (map != null && props.userLocation.length > 0) {
            if (userMarker !== null) {
                userMarker.remove();
            }

            // detect if user out of route
            if (props.onRoute) {
                const routeOnMap = turf.lineString(props.navigationRoute[0].data.routes[0].geometry.coordinates);
                const userLocation = turf.point([props.userLocation[0].lng, props.userLocation[0].lat]);
                const distance = turf.nearestPointOnLine(routeOnMap, userLocation, { units: 'metres' });
                if (distance.properties.dist > 100) {
                    // if user is 100m off the plotted route, do a reroute
                    const endLocation = props.endLocation;
                    props.cancelRoute();
                    props.processStartLocation(props.userLocation);
                    props.processEndLocation(endLocation);
                    props.planRoute(props.userLocation, endLocation);
                }
            } // end of onroute

            // detect if user passed a camera location
            let tolerance = 0.0005;
            if (props.cameraMarkers.length > 0) {
                let user = props.userLocation[0];
                let nextCamera = props.cameraMarkers[0].camera.location;
                if ((user.lng - nextCamera.longitude <= tolerance &&
                    user.lng - nextCamera.longitude >= -tolerance) &&
                    (user.lat - nextCamera.latitude <= tolerance &&
                        user.lat - nextCamera.latitude >= -tolerance)) {
                    // update cameramarker state
                    // remove cameras as they pass through
                    let a = props.cameraMarkers;
                    a.splice(0, 1);
                    props.updateNextCamera(a);
                }
            }

            marker.setLngLat([props.userLocation[0].lng, props.userLocation[0].lat]);
            const stepNo = props.stepNo;

            map.flyTo({
                center: [props.userLocation[0].lng, props.userLocation[0].lat],
            });
            
            if (marker !== undefined && stepMarkers[stepNo] !== undefined) {
                // turn camera to face the next marker
                var point1 = turf.point([props.userLocation[0].lng, props.userLocation[0].lat]);
                var point2 = turf.point([stepMarkers[stepNo].getLngLat().lng, stepMarkers[stepNo].getLngLat().lat]);
                var bearing = turf.bearing(point1, point2);
                map.flyTo({
                    center: [props.userLocation[0].lng, props.userLocation[0].lat],
                    bearing: bearing,
                });
                
                // detect if user has reached a checkpoint
                if ((marker.getLngLat().lng - stepMarkers[stepNo].getLngLat().lng <= tolerance &&
                    marker.getLngLat().lng - stepMarkers[stepNo].getLngLat().lng >= -tolerance) &&
                    (marker.getLngLat().lat - stepMarkers[stepNo].getLngLat().lat <= tolerance &&
                        marker.getLngLat().lat - stepMarkers[stepNo].getLngLat().lat >= -tolerance)) {
                    stepMarkers[stepNo].remove();

                    if (props.stepNo < props.routeInstruction.length - 1) {
                        props.updateSteps(props.stepNo + 1);
                    } else {
                        // User reaches end of the route
                        // map.removeLayer('LineString');
                        if (props.user !== null) {
                            props.saveHistory({
                                userId: props.user.uid,
                                navigationRoute: props.navigationRoute,
                                routeName: props.routeName,
                                startLocation: props.startLocation,
                                endLocation: props.endLocation,
                            });
                        }

                        clearMap();
                        props.tripSummary();
                    }
                }
            } //
            marker.addTo(map);
            setUserMarker(marker);
        }
    }, [props.userLocation])

  /* *
     * ROUTE PLOTTING
     * When a route has been set, run the following code.
     */
    useEffect(() => {
        if (props.navigationRoute !== [] && props.navigationRoute.length > 0) {
            map.flyTo({
                center: [props.startLocation[0].lng, props.startLocation[0].lat]
            });

            // setting up path
            var steps = 1;
            props.navigationRoute[0].data.routes[0].legs[0].steps.forEach(instruction => {
                var el = document.createElement('div');
                el.className = 'marker';
                el.style.backgroundColor = "green";
                el.style.textAlign = "center";
                el.textContent = steps;
                el.style.width = '30px';
                el.style.height = '50px';

                let step = new mapboxgl.Marker(el);
                step.setLngLat(instruction.maneuver.location);
                step.addTo(map);
                setStepMarkers(stepMarkers => [...stepMarkers, step]);
                steps++;
            });

            // display step by step instruction
            // plotting route on the map
            var coordinates = props.navigationRoute[0].data.routes[0].geometry;
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
                    'line-color': '#000000',
                    'line-width': 5
                }
            });

            // Detect if there is any traffic cameras on the way
            let cameraArr = [];

            let pivotLocation = {};
            if (props.userLocation.length > 0) {
                pivotLocation = props.userLocation[0];
            } else {
                pivotLocation = props.startLocation[0];
            }

            // process through all the cameras and store necessary cameras in a state
            props.cameras.map(c => {
                var cameraPosition = { lng: c.location.longitude, lat: c.location.latitude };
                // detect if route plot by mapbox intersects position of camera
                var points = turf.lineIntersect(turf.lineString(coordinates.coordinates), turf.polygon([[[cameraPosition.lng + 0.0005, cameraPosition.lat],
                [cameraPosition.lng, cameraPosition.lat + 0.0005], [cameraPosition.lng - 0.0005, cameraPosition.lat], [cameraPosition.lng, cameraPosition.lat - 0.0005], [cameraPosition.lng + 0.0005, cameraPosition.lat]]]));
                if (points.features.length > 0) {
                    var el = document.createElement('img');
                    el.src = c.image;
                    el.style.textAlign = "center";
                    el.style.width = '80px';
                    el.style.height = '80px';

                    let cameraMarker = new mapboxgl.Marker(el);
                    cameraMarker.setLngLat(cameraPosition);
                    cameraMarker.addTo(map);
                    setPinnedCameraMarkers(pinnedCameraMarkers => [...pinnedCameraMarkers, cameraMarker]);
                    const distance = turf.distance(turf.point([pivotLocation.lng, pivotLocation.lat]), turf.point([cameraPosition.lng, cameraPosition.lat]), { units: 'metres' });
                    cameraArr.push({ camera: c, dist: distance });
                }
            });
            // store only cameras on the route to destination
            cameraArr.sort(function (a, b) {
                return a.dist - b.dist;
            });
            props.updateCameraMarkers(cameraArr);

            // process erp data
            // take id and location of GantryCoordinates and plot stuff
            // GantryCoordinates {id,coordinates}
            // props.ERP {}
            let routeErps = [];
            var d = new Date();
            var currentDayType = '';
            if (d.getDay() === 0 || d.getDay() === 6) {
                currentDayType = 'Weekdays';
            } else {
                currentDayType = 'Weekends';
            }
            GantryCoordinates.map(gantry => {
                const gantryCoordinates = { lng: gantry.coordinates[0], lat: gantry.coordinates[1] };
                var points = turf.lineIntersect(turf.lineString(coordinates.coordinates), turf.polygon([[[gantryCoordinates.lng + 0.0005, gantryCoordinates.lat],
                [gantryCoordinates.lng, gantryCoordinates.lat + 0.0005], [gantryCoordinates.lng - 0.0005, gantryCoordinates.lat], [gantryCoordinates.lng, gantryCoordinates.lat - 0.0005], [gantryCoordinates.lng + 0.0005, gantryCoordinates.lat]]]));
                if (points.features.length > 0) {
                    var el = document.createElement('div');
                    el.className = 'marker';
                    el.style.backgroundColor = "red";
                    el.style.color = 'black';
                    el.style.textAlign = "center";
                    el.textContent = 'Zone: ' + gantry.zoneId + " Charge: 0";
                    el.style.width = '80px';
                    el.style.height = '80px';
                    el.style.opacity = '0.8';
                    el.style.padding = '5';
                    el.style.borderRadius = '50%';

                    const distance = turf.distance(turf.point([pivotLocation.lng, pivotLocation.lat]), turf.point([gantryCoordinates.lng, gantryCoordinates.lat]), { units: 'metres' });
                    let abstract = props.ERP;
                    routeErps.push([abstract.filter(e => e.ZoneID === gantry.zoneId), distance]);

                    let erp = new mapboxgl.Marker(el);
                    erp.setLngLat(gantryCoordinates);
                    erp.addTo(map);
                    setErpMarkers(erpMarkers => [...erpMarkers, erp]);
                }
            });

            routeErps.sort(function (a, b) {
                return a[1] - b[1];
            });
            props.filterRouteErp(routeErps);

        } else {
            if (map != null) {
                // end of route, clear everything
                map.removeLayer('LineString');
                map.removeSource('LineString');
                clearMap();
            }
        }
    }, [props.navigationRoute]);

    function clearMap() {
        pinnedCameraMarkers.map(c => {
            c.remove();
        });
        stepMarkers.map(s => {
            s.remove();
        });
        erpMarkers.map(e => {
            e.remove();
        });
        setPinnedCameraMarkers([]);
        setStepMarkers([]);
        setErpMarkers([]);
        props.updateCameraMarkers([]);
        props.filterRouteErp([]);
    }

    return(<div></div>)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MapFunctions);