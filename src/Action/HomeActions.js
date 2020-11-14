// import action types
import {
    GET_USER_LOCATION, HISTORY_VIEW, TOGGLE_ROUTE_PLANNER, TOGGLE_TRAFFIC_IMAGES_VIEW,
    TOGGLE_MAP_PICKER, RETURN_MAP_PICKER_RESULT, BOOKMARK_VIEW, OVERRIDE_USER_LOCATION,
    CLEAR_ERROR_MESSAGE
} from '../Constants/actionTypes';

/**
 * Action definitions. Defines action input, types and payload that will be delivered to the reducers.
 * HomeActions defines actions that may be performed in the home view which is the screen that user will
 * start off with.
 * 
 * @author Koh Tong Liang
 * @version 1
 * @since 30/10/2020
 */

/**
 * Call on browser location service to provide location of user's device
 * MAYBE TRANSFER TO MAP ACTIONS
 */
export function getUserLocation() {
    return { type: GET_USER_LOCATION };
}

/**
 * Open route planner menu
 */
export function toggleRoutePlanner() {
    return { type: TOGGLE_ROUTE_PLANNER }
}

/**
 * Cause the small window to slide up, displaying traffic images and additional data
 * useful for the trip
 */
export function toggleTrafficImagesView(payload) {
    return { type: TOGGLE_TRAFFIC_IMAGES_VIEW, payload }
}

/**
 * DEBUG function to override user location
 */
export function overrideUserLocation(payload) {
    return { type: OVERRIDE_USER_LOCATION, payload }
}

/**
 * Show/Hide history view
 */
export function toggleHistoryView() {
    return { type: HISTORY_VIEW }
}

/**
 * Show/Hide bookmark view
 */
export function toggleBookmarkView() {
    return { type: BOOKMARK_VIEW }
}
export function clearErrorMessage () {
    return { type: CLEAR_ERROR_MESSAGE, };
}

/**
 * Switch to map picker mode
 */
export function toggleMapPicker() {
    return { type: TOGGLE_MAP_PICKER }
}

/**
 * Return coordinates of location chosen by user using mappicker mode to select start/end location
 */
export function returnMapPickerResult(payload) {
    return { type: RETURN_MAP_PICKER_RESULT, payload }
}