import Axios from 'axios';
import { SEARCH_START_LOCATION, SEARCH_END_LOCATION, PLAN_ROUTE } from '../Constants/actionTypes';
import axios from 'axios';
/**
 * Navigation definitions. 
 * 
 * @Koh Tong Liang
 * @Version 1
 * @Since 31/10/2020
*/


const initialState = {
    startLocation: [],
    endLocation: [],
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
            }
        }).then(function (response) {
            var result = response.data.features;
            dispatch({ type: SEARCH_END_LOCATION, payload: result });
        });
    };
}

/**
 */
export function planRoute (payload) {
    return { type: PLAN_ROUTE, payload }
}