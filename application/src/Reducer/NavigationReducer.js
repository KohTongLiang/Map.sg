import { SEARCH_START_LOCATION_SUCCEEDED, SEARCH_END_LOCATION_SUCCEEDED, PROCESS_START_LOCATION,
    PROCESS_END_LOCATION, PLAN_ROUTE_SUCCEEDED, TRIP_SUMMARY, SAVE_TRIP, MAP_MATCHING_SUCCEEDED } from '../Constants/actionTypes';

/**
 * Home reducers to update states belonging to Home view
 * @Koh Tong Liang
 * @Version 1
 * @Since 31/10/2020
*/

const initialState = {
    startLocation: [],
    endLocation: [],
    startLocationSearchResult: [],
    endLocationSearchResult: [],
    navigationRoute: [],
    mapMatchedRoute: [],
    tripSummaryView: false,
}

function NavigationReducer (state = initialState, action) {
    // determine what action to perform and which state to update
    switch (action.type) {
        case SEARCH_START_LOCATION_SUCCEEDED:
            return Object.assign({}, state, {
                startLocationSearchResult: state.startLocationSearchResult.concat(action.payload)
            });
        case SEARCH_END_LOCATION_SUCCEEDED:
            return Object.assign({}, state, {
                endLocationSearchResult: state.endLocationSearchResult.concat(action.payload)
            });
        case PROCESS_START_LOCATION:
            return Object.assign({}, state, {
                startLocationSearchResult: initialState.startLocationSearchResult,
                startLocation: state.startLocation.concat({lng: action.payload.geometry.coordinates[0], lat: action.payload.geometry.coordinates[1]}),
            });
        case PROCESS_END_LOCATION:
            return Object.assign({}, state, {
                endLocationSearchResult: initialState.endLocationSearchResult,
                endLocation: state.endLocation.concat({lng: action.payload.geometry.coordinates[0], lat: action.payload.geometry.coordinates[1]}),
            });
        case PLAN_ROUTE_SUCCEEDED:
            return Object.assign({}, state, {
                navigationRoute: state.navigationRoute.concat(action.payload),
            });
        case MAP_MATCHING_SUCCEEDED:
            return Object.assign({}, state, {
                mapMatchedRoute: state.mapMatchedRoute.concat(action.payload),
            });
        case TRIP_SUMMARY:
            return Object.assign({}, state, {
                tripSummaryView: !state.tripSummaryView,
                startLocation: initialState.startLocation,
                endLocation: initialState.endLocation,
                navigationRoute: initialState.navigationRoute,
            });
        case SAVE_TRIP:
            // store navigation route
            break;
        default:
    } // end of switch case
    return state;
}

export default NavigationReducer;