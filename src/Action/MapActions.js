// import action types
import { GET_TRAFFIC_IMAGES, GET_ERP_DATA, UPDATE_CAMERA_MARKERS, UPDATE_LINE_STRING, UPDATE_NEXT_CAMERA, SET_USER_MARKER, SET_PINNED_CAMERA_MARKERS, SET_ERP_MARKERS, SET_STEP_MARKERS, SET_MAP } from '../Constants/actionTypes';


/**
 * Action definitions. Defines action input, types and payload that will be delivered to the reducers.
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

export function updateLineString (payload) {
    return { type: UPDATE_LINE_STRING, payload }
}

export function updateNextCamera (payload) {
    return { type: UPDATE_NEXT_CAMERA, payload }
}

export function updateCameraMarkers (payload) {
    return { type: UPDATE_CAMERA_MARKERS, payload }
}

export function setUserMarker (payload) {
    return { type: SET_USER_MARKER, payload }
}

export function setPinnedCameraMarkers (payload) {
    return { type: SET_PINNED_CAMERA_MARKERS, payload }
}

export function setErpMarkers (payload) {
    return { type: SET_ERP_MARKERS, payload }
}

export function setStepMarkers (payload) {
    return { type: SET_STEP_MARKERS, payload }
}

export function setMap (payload) {
    return { type: SET_MAP, payload }
}