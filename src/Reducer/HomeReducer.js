// import action types
import {
    GET_USER_LOCATION_SUCCEEDED, HISTORY_VIEW, 
    TOGGLE_TRAFFIC_IMAGES_VIEW, BOOKMARK_VIEW, 
    CLEAR_ERROR_MESSAGE, SET_FAILURE_MESSAGE, 
    OVERRIDE_USER_LOCATION, TOGGLE_SIGN_IN_VIEW
} from '../Constants/actionTypes';

// Initialise initial values for state
const initialState = {
    trafficImagesView: false,
    userLocation: [],
    historyView: false,
    bookmarkView: false,
    signInView: false,
    errorMessage: '',
}

/**
 * Home reducers to update states belonging to Home view
 * @author Delon
 * @version 1
 * @since 31/10/2020
*/
function HomeReducer(state = initialState, action) {
    // determine what action to perform and which state to update
    switch (action.type) {
        case OVERRIDE_USER_LOCATION:
            return Object.assign({}, state, {
                userLocation: initialState.userLocation.concat({ lng: action.payload.lng, lat: action.payload.lat })
            });
        case GET_USER_LOCATION_SUCCEEDED:
            return Object.assign({}, state, {
                userLocation: initialState.userLocation.concat(action.payload)
            });
        case HISTORY_VIEW:
            return Object.assign({}, state, {
                historyView: !state.historyView
            });
        case BOOKMARK_VIEW:
            return Object.assign({}, state, {
                bookmarkView: !state.bookmarkView
            });
        case TOGGLE_SIGN_IN_VIEW:
            return Object.assign({}, state, {
                signInView: !state.signInView
            });
        case TOGGLE_TRAFFIC_IMAGES_VIEW:
            break;
        case SET_FAILURE_MESSAGE:
            return Object.assign({}, state, {
                errorMessage: initialState.errorMessage.concat(action.payload)
            });
        case CLEAR_ERROR_MESSAGE:
            return Object.assign({}, state, {
                errorMessage: initialState.errorMessage
            });
        default:
    } // end of switch case

    return state;
}

export default HomeReducer;