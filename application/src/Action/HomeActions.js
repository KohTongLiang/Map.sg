import { GET_USER_LOCATION, TOGGLE_ROUTE_PLANNER, TOGGLE_TRAFFIC_IMAGES_VIEW } from '../Constants/actionTypes';


/**
 * Action definitions. Defines action input, types and payload that will be delivered to the reducers.
 * HomeActions defines actions that may be performed in the home view which is the screen that user will
 * start off with.
 * 
 * @Koh Tong Liang
 * @Version 1
 * @Since 30/10/2020
*/

let userLocation = [];

/**
 * Call on browser location service to provide location of user's device
 * MAYBE TRANSFER TO MAP ACTIONS
 */
export function getUserLocation (payload) {
    return { type: GET_USER_LOCATION, payload };
}

/**
 * Open route planner menu
 */
export function toggleRoutePlanner (payload) {
    return { type: TOGGLE_ROUTE_PLANNER, payload }
}

/**
 * Cause the small window to slide up, displaying traffic images and additional data
 * useful for the trip
 */
export function toggleTrafficImagesView (payload) {
    return { type: TOGGLE_TRAFFIC_IMAGES_VIEW, payload }
}
