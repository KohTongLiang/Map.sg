// import action types
import {
    GET_TRAFFIC_IMAGES_SUCCEEDED, GET_ERP_DATA_SUCCEEDED,
    UPDATE_CAMERA_MARKERS, UPDATE_LINE_STRING, UPDATE_NEXT_CAMERA, SET_USER_MARKER, SET_PINNED_CAMERA_MARKERS, SET_ERP_MARKERS, SET_STEP_MARKERS, SET_MAP
} from '../Constants/actionTypes';

// Initialise initial values for state
const initialState = {
    cameras: [],
    cameraMarkers: [],
    ERP: [],
    lineString: [],
    userMarker: [],
    pinnedCameraMarkers: [],
    erpMarkers: [],
    stepMarkers: [],
    map: [],
}



/**
 * Map Reducer serves to update the states pertaining to the map view. Such as camera and erp positions and list
 * @author Jeremiah
 * @version 1
 * @since 30/10/2020
*/
export default function MapReducer(state = initialState, action) {
    // determine what action to perform and which state to update
    switch (action.type) {
        case UPDATE_CAMERA_MARKERS:
            return Object.assign({}, state, {
                cameraMarkers: initialState.cameraMarkers.concat(action.payload)
            });
        case GET_TRAFFIC_IMAGES_SUCCEEDED:
            return Object.assign({}, state, {
                cameras: initialState.cameras.concat(action.payload)
            });
        case GET_ERP_DATA_SUCCEEDED:
            return Object.assign({}, state, {
                ERP: initialState.ERP.concat(action.payload)
            });
        case UPDATE_LINE_STRING:
            return Object.assign({}, state, {
                lineString: initialState.lineString.concat(action.payload)
            });
        case UPDATE_NEXT_CAMERA:
            return Object.assign({}, state, {
                cameraMarkers: initialState.cameraMarkers.concat(action.payload)
            });
        case SET_USER_MARKER:
            return Object.assign({}, state, {
                userMarker: initialState.userMarker.concat(action.payload)
            });
        case SET_PINNED_CAMERA_MARKERS:
            return Object.assign({}, state, {
                pinnedCameraMarkers: initialState.pinnedCameraMarkers.concat(action.payload)
            });
        case SET_ERP_MARKERS:
            return Object.assign({}, state, {
                erpMarkers: initialState.erpMarkers.concat(action.payload)
            });
        case SET_STEP_MARKERS:
            return Object.assign({}, state, {
                stepMarkers: initialState.stepMarkers.concat(action.payload)
            });
        case SET_MAP:
            return Object.assign({}, state, {
                map: initialState.map.concat(action.payload)
            });
        default:
    }

    return state;
}