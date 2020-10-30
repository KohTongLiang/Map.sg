import Axios from 'axios';
import { SEARCH_START_LOCATION, SEARCH_END_LOCATION, PLAN_ROUTE, PROCESS_START_LOCATION, PROCESS_END_LOCATION } from '../Constants/actionTypes';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

/**
 * Navigation definitions. 
 * 
 * @Koh Tong Liang
 * @Version 1
 * @Since 31/10/2020
*/

const initialState = {
}
const accessToken = process.env.REACT_APP_MAPBOX_KEY;

/**
 * Search starting location
 */
export function searchStartLocation (searchText) {
    return function(dispatch) {
        return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json`,{
            params: {
                access_token: accessToken,
                country: 'sg',
            }
        }).then(function (response) {
            // response.data.features contains array of possible location that the entered text referred to.
            var result = response.data.features;
            dispatch({ type: SEARCH_START_LOCATION, payload: result });
        });
    };
}

/**
 */
export function searchEndLocation (searchText) {
    return function(dispatch) {
        return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json`,{
            params: {
                access_token: accessToken,
                country: 'sg',
            }
        }).then(function (response) {
            var result = response.data.features;
            dispatch({ type: SEARCH_END_LOCATION, payload: result });
        });
    };
}

/**
 * 
 * @param {*} payload 
 */
export function processStartLocation (payload) {
    return { type: PROCESS_START_LOCATION, payload }
}

/**
 * 
 * @param {*} payload 
 */
export function processEndLocation (payload) {
    return { type: PROCESS_END_LOCATION, payload }
}

export function planRoute (startLocation, endLocation) {
    return function(dispatch) {
        axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${startLocation[0].lng},${startLocation[0].lat};${endLocation[0].lng},${endLocation[0].lat}`,{
            params: {
                access_token: mapboxgl.accessToken,
                steps: true,
                banner_instructions: true,
                voice_instructions: true,
                geometries: 'geojson',
            }
        }).then(function (response) {
            dispatch({ type: PLAN_ROUTE, payload: response });
        });
    };
}