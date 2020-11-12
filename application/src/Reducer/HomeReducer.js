// import action types
import {
    GET_USER_LOCATION_SUCCEEDED, HISTORY_VIEW, TOGGLE_ROUTE_PLANNER,
    TOGGLE_TRAFFIC_IMAGES_VIEW, TOGGLE_MAP_PICKER, RETURN_MAP_PICKER_RESULT,
    BOOKMARK_VIEW
} from '../Constants/actionTypes';

// Initialise initial values for state
const initialState = {
    routePlannerView: false,
    trafficImagesView: false,
    userLocation: [],
    historyView: false,
    bookmarkView: false,
    mapPickerMode: false,
    mapPickerResult: [],
}

/**
 * Home reducers to update states belonging to Home view
 * @author Koh Tong Liang
 * @version 1
 * @since 31/10/2020
*/
function HomeReducer(state = initialState, action) {
    // determine what action to perform and which state to update
    switch (action.type) {
        case 'OVERRIDE_USER_LOCATION':
            return Object.assign({}, state, {
                userLocation: initialState.userLocation.concat({ lng: action.payload.lng, lat: action.payload.lat })
            });
        case GET_USER_LOCATION_SUCCEEDED:
            return Object.assign({}, state, {
                userLocation: initialState.userLocation.concat(action.payload)
            });
        case TOGGLE_ROUTE_PLANNER:
            return Object.assign({}, state, {
                routePlannerView: !state.routePlannerView
            });
        case TOGGLE_MAP_PICKER:
            return Object.assign({}, state, {
                mapPickerMode: !state.mapPickerMode
            });
        case HISTORY_VIEW:
            return Object.assign({}, state, {
                historyView: !state.historyView
            });
        case BOOKMARK_VIEW:
            return Object.assign({}, state, {
                bookmarkView: !state.bookmarkView
            });
        case RETURN_MAP_PICKER_RESULT:
            return Object.assign({}, state, {
                mapPickerResult: initialState.mapPickerResult.concat(action.payload),
            });
        case TOGGLE_TRAFFIC_IMAGES_VIEW:
            break;
        default:
    } // end of switch case

    return state;
}

export default HomeReducer;