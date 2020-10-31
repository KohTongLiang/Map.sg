import { SEARCH_START_LOCATION, SEARCH_END_LOCATION, PLAN_ROUTE, PROCESS_START_LOCATION, PROCESS_END_LOCATION, TRIP_SUMMARY, SAVE_TRIP, MAP_MATCHING } from '../Constants/actionTypes';

/**
 * Navigation action definitions.
 * 
 * @Koh Tong Liang
 * @Version 1
 * @Since 31/10/2020
*/

/**
 * Perform searchStartLocation action. Takes in a search term and mapbox api will return all possible search result
 * @param {string} payload
 */
export function searchStartLocation (payload) {
    return { type: SEARCH_START_LOCATION, payload }
}

/**
 * Perform searchEndLocation action. Takes in a search term and mapbox api will return all possible search result
 * @param {string} payload
 */
export function searchEndLocation (payload) {
    return { type: SEARCH_END_LOCATION, payload }
}

/**
 * Takes in final coordinates of the start position and store it as a state
 * @param {object} payload as a lng/lat coordinates
 */
export function processStartLocation (payload) {
    return { type: PROCESS_START_LOCATION, payload }
}

/**
 * Takes in final coordinates of the start position and store it as a state
 * @param {object} payload as a lng/lat coordinates
 */
export function processEndLocation (payload) {
    return { type: PROCESS_END_LOCATION, payload }
}

/**
 * Takes in start and end location
 * @param {object} startLocation
 * @param {object} endLocation 
 */
export function planRoute (startLocation, endLocation) {
    return { type: PLAN_ROUTE, payload: { startLocation, endLocation } }
}

/**
 * Called when user reaches the last waypoint of the route
 */
export function tripSummary () {
    return { type: TRIP_SUMMARY }
}

/**
 * Optional action where user may choose to store the route they have just taken as object.
 * @param {object} 
 */
export function saveTrip (payload) {
    return { type: SAVE_TRIP, payload }
}

/**
 * Takes in coordinates provided by directions API and run it through another API to perfect the linestring geojson
 * @param {object} 
 */
export function mapMatching (payload) {
    return { type: MAP_MATCHING, payload }
}
