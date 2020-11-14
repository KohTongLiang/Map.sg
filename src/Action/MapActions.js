// import action types
import { GET_TRAFFIC_IMAGES, GET_ERP_DATA, UPDATE_CAMERA_MARKERS, UPDATE_LINE_STRING, UPDATE_NEXT_CAMERA, SET_USER_MARKER, SET_PINNED_CAMERA_MARKERS, SET_ERP_MARKERS, SET_STEP_MARKERS, SET_MAP } from '../Constants/actionTypes';

/**
 * Action definitions. Defines action input, types and payload that will be delivered to the reducers
 * 
 * @author Koh Tong Liang
 * @version 1
 * @since 30/10/2020
 */

export function getTrafficImages () {
    return { type: GET_TRAFFIC_IMAGES }
}

export function getErpData () {
    return { type: GET_ERP_DATA }
}

/**
 * Currently not in use
 * @param {string} payload 
 */
export function updateLineString (payload) {
    return { type: UPDATE_LINE_STRING, payload }
}

/**
 * Get a array of cameras as input.
 * @param {array[string]} payload 
 */
export function updateNextCamera (payload) {
    return { type: UPDATE_NEXT_CAMERA, payload }
}

/**
 * Takes in array of markers representing all the traffic images
 * @param {array[string]}
 */
export function updateCameraMarkers (payload) {
    return { type: UPDATE_CAMERA_MARKERS, payload }
}

/**
 * Takes in marker object created when user location is found and store in it store
 * @param {object}
 */
export function setUserMarker (payload) {
    return { type: SET_USER_MARKER, payload }
}

/**
 * Takes in array of marker object pf cameras along the route created to pin on the map and store in it store
 * @param {array[object]}
 */
export function setPinnedCameraMarkers (payload) {
    return { type: SET_PINNED_CAMERA_MARKERS, payload }
}

/**
 * Takes in array of marker object created to pin on the map and store in it store
 * @param {array[object]}
 */
export function setErpMarkers (payload) {
    return { type: SET_ERP_MARKERS, payload }
}

/**
 * Takes in array of waypoints created to guide user along the route and store in it store
 * @param {array[object]}
 */
export function setStepMarkers (payload) {
    return { type: SET_STEP_MARKERS, payload }
}

/**
 * Takes in marker object created when map is instantiated and store in it store
 * @param {object}
 */
export function setMap (payload) {
    return { type: SET_MAP, payload }
}