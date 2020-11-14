// import action types
import {
    GET_USER_LOCATION, HISTORY_VIEW, TOGGLE_ROUTE_PLANNER, TOGGLE_TRAFFIC_IMAGES_VIEW,
    TOGGLE_MAP_PICKER, RETURN_MAP_PICKER_RESULT, BOOKMARK_VIEW, OVERRIDE_USER_LOCATION,
    CLEAR_ERROR_MESSAGE
} from '../Constants/actionTypes';

/**
 * Action definitions. Defines action input, types and payload that will be delivered to the reducers.
 * 
 * @author Koh Tong Liang
 * @version 1
 * @since 30/10/2020
 */
export function getUserLocation() {
    return { type: GET_USER_LOCATION };
}

export function toggleRoutePlanner() {
    return { type: TOGGLE_ROUTE_PLANNER }
}

export function toggleTrafficImagesView(payload) {
    return { type: TOGGLE_TRAFFIC_IMAGES_VIEW, payload }
}

export function overrideUserLocation(payload) {
    return { type: OVERRIDE_USER_LOCATION, payload }
}

export function toggleHistoryView() {
    return { type: HISTORY_VIEW }
}

export function toggleBookmarkView() {
    return { type: BOOKMARK_VIEW }
}
export function clearErrorMessage () {
    return { type: CLEAR_ERROR_MESSAGE, };
}

export function toggleMapPicker(payload) {
    return { type: TOGGLE_MAP_PICKER, payload }
}

export function returnMapPickerResult(payload) {
    return { type: RETURN_MAP_PICKER_RESULT, payload }
}