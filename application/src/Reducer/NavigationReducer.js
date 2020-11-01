import { SEARCH_START_LOCATION_SUCCEEDED, SEARCH_END_LOCATION_SUCCEEDED, PROCESS_START_LOCATION,
    PROCESS_END_LOCATION, PLAN_ROUTE_SUCCEEDED, TRIP_SUMMARY, SAVE_TRIP, MAP_MATCHING_SUCCEEDED, CANCEL_ROUTE, UPDATE_STEPS } from '../Constants/actionTypes';

/**
 * Home reducers to update states belonging to Home view
 * @Koh Tong Liang
 * @Version 1
 * @Since 31/10/2020
*/

const initialState = {
    startLocation: [],
    endLocation: [],
    startLocationSearchResult: [], // for routeplanner form
    endLocationSearchResult: [], // for routeplanner form
    navigationRoute: [], // geometric data of the route user is taking
    mapMatchedRoute: [], // fixed route linestring
    tripSummaryView: false, // toggle view for end of trip summary
    onRoute: false, // show that user is on journey
    stepNo: 0, // indiciate which stage of step by step instruction user is in
    routeInstruction: [], // stores step by step instruction
}

function NavigationReducer (state = initialState, action) {
    // determine what action to perform and which state to update
    switch (action.type) {
        case UPDATE_STEPS:
            return Object.assign({}, state, {
                stepNo: initialState.stepNo + action.payload,
            });
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
                navigationRoute: state.navigationRoute.concat(action.payload.route),
                onRoute: !state.onRoute,
                routeInstruction: state.routeInstruction.concat(action.payload.routeInstruction),
            });
        case MAP_MATCHING_SUCCEEDED:
            return Object.assign({}, state, {
                mapMatchedRoute: state.mapMatchedRoute.concat(action.payload),
            });
        case TRIP_SUMMARY:
            return Object.assign({}, state, {
                ...initialState,
                tripSummaryView: !state.tripSummaryView
            });
        case CANCEL_ROUTE:
            // return initialState;
            return Object.assign({}, state, {
                ...initialState,
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