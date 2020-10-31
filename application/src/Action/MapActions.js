import { GET_TRAFFIC_IMAGES, GET_ERP_DATA, UPDATE_STEPS, UPDATE_CAMERA_MARKERS } from '../Constants/actionTypes';

/**
 * Action definitions. Defines action input, types and payload that will be delivered to the reducers
 * 
 * @Koh Tong Liang
 * @Version 1
 * @Since 30/10/2020
*/

export function getTrafficImages () {
    return { type: GET_TRAFFIC_IMAGES }
}

export function getErpData () {
    return { type: GET_ERP_DATA }
}

export function updateSteps (payload) {
    return { type: UPDATE_STEPS, payload }
}

/**
 * Takes in array of markers representing all the traffic images
 * @param {array[string]}
 */
export function updateCameraMarkers (payload) {
    return { type: UPDATE_CAMERA_MARKERS, payload }
}