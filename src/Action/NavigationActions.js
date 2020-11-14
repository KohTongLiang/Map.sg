// import actiont types
import {
    SEARCH_START_LOCATION, SEARCH_END_LOCATION, PLAN_ROUTE, PROCESS_START_LOCATION, PROCESS_END_LOCATION, TRIP_SUMMARY,
    SAVE_TRIP, MAP_MATCHING, CANCEL_ROUTE, REROUTE, UPDATE_STEPS, FILTER_ROUTE_ERP, SAVE_ROUTE_NAME, RUN_HISTORY,
    TOGGLE_BOOKMARK, GET_NAME_OF_PLACE, SET_START_LOCATION_SEARCH,SET_END_LOCATION_SEARCH
} from '../Constants/actionTypes';

/**
 * Action definitions. Defines action input, types and payload that will be delivered to the reducers.
 * FirebaseAction defines actions that is required for view to interact with firebase services
 * 
 * @author Koh Tong Liang
 * @version 1
 * @since 31/10/2020
 */

/**
 * Perform searchStartLocation action. Takes in a search term and mapbox api will return all possible search result
 * @param {string} payload
 */
export function searchStartLocation(payload) {
    return { type: SEARCH_START_LOCATION, payload }
}

/**
 * Perform searchEndLocation action. Takes in a search term and mapbox api will return all possible search result
 * @param {string} payload
 */
export function searchEndLocation(payload) {
    return { type: SEARCH_END_LOCATION, payload }
}

/**
 * Takes in final coordinates of the start position and store it as a state
 * @param {object} payload as a lng/lat coordinates
 */
export function processStartLocation(payload) {
    return { type: PROCESS_START_LOCATION, payload }
}

/**
 * Takes in final coordinates of the start position and store it as a state
 * @param {object} payload as a lng/lat coordinates
 */
export function processEndLocation(payload) {
    return { type: PROCESS_END_LOCATION, payload }
}

/**
 * Takes in start and end location
 * @param {object} startLocation
 * @param {object} endLocation 
 */
export function planRoute(startLocation, endLocation) {
    return { type: PLAN_ROUTE, payload: { startLocation, endLocation } }
}

/**
 * If user goes off course. May not need to do this here
 */
export function reroute(userLocation, endLocation) {
    return { type: REROUTE, payload: { userLocation, endLocation } }
}

/**
 * Called when user reaches the last waypoint of the route
 */
export function tripSummary() {
    return { type: TRIP_SUMMARY }
}

/**
 * Optional action where user may choose to store the route they have just taken as object.
 * @param {object} 
 */
export function saveTrip(payload) {
    return { type: SAVE_TRIP, payload }
}

/**
 * Takes in coordinates provided by directions API and run it through another API to perfect the linestring geojson
 * @param {object} payload
 */
export function mapMatching(payload) {
    return { type: MAP_MATCHING, payload }
}

/**
 * Update steps for turn by turn instruction as user reaches the different waypoints.
 * @param {int} payload
 */
export function updateSteps(payload) {
    return { type: UPDATE_STEPS, payload }
}

/**
 * Reset route information and exit navigation view
 */
export function cancelRoute() {
    return { type: CANCEL_ROUTE }
}

/**
 * 
 */
export function filterRouteErp(payload) {
    return { type: FILTER_ROUTE_ERP, payload }
}

export function saveRouteName(payload) {
    return { type: SAVE_ROUTE_NAME, payload }
}

export function runHistory(payload) {
    return { type: RUN_HISTORY, payload }
}

export function toggleBookmark(payload) {
    return { type: TOGGLE_BOOKMARK, payload }
}

export function getNameOfPlace(payload) {
    return { type: GET_NAME_OF_PLACE, payload }
}

export function setStartLocationSearch(payload) {
    return { type: SET_START_LOCATION_SEARCH, payload }
}

export function setEndLocationSearch(payload) {
    return { type: SET_END_LOCATION_SEARCH, payload }
}