import {
    SEARCH_START_LOCATION_SUCCEEDED, SEARCH_END_LOCATION_SUCCEEDED, PROCESS_START_LOCATION,
    PROCESS_END_LOCATION, PLAN_ROUTE_SUCCEEDED, TRIP_SUMMARY, MAP_MATCHING_SUCCEEDED,
    CANCEL_ROUTE, UPDATE_STEPS, REROUTE_SUCCEEDED, FILTER_ROUTE_ERP, SAVE_ROUTE_NAME,
    RUN_HISTORY, SET_START_LOCATION_SEARCH, SET_END_LOCATION_SEARCH,TOGGLE_ROUTE_PLANNER,
    TOGGLE_MAP_PICKER, RETURN_MAP_PICKER_RESULT
} from '../Constants/actionTypes';

// Initialise initial values for state
const initialState = {
    routePlannerView: false,
    startLocation: [],
    endLocation: [],
    routeName: [],
    startLocationSearchResult: [], // for routeplanner form
    endLocationSearchResult: [], // for routeplanner form
    navigationRoute: [], // geometric data of the route user is taking
    mapMatchedRoute: [], // fixed route linestring
    tripSummaryView: false, // toggle view for end of trip summary
    onRoute: false, // show that user is on journey
    stepNo: 0, // indiciate which stage of step by step instruction user is in
    routeInstruction: [], // stores step by step instruction
    erpCharge: [], // store erp charges along the
    erpTotalCharge: [], // store total erp charges incurred
    erpFiltered: [],
    startLocationSearch: '',
    endLocationSearch: '',
    mapPickerMode: 0,
    mapPickerResult: [],
}

/**
 * Navigation reducers to update states pertaining to navigation such as route information, start/end locations
 * @Koh Tong Liang
 * @Version 1
 * @Since 31/10/2020
*/
function NavigationReducer(state = initialState, action) {
    // determine what action to perform and which state to update
    switch (action.type) {
        case UPDATE_STEPS:
            return Object.assign({}, state, {
                stepNo: initialState.stepNo + action.payload,
            });
        case TOGGLE_MAP_PICKER:
            return Object.assign({}, state, {
                mapPickerMode: initialState.mapPickerMode + action.payload,
                routePlannerView: !state.routePlannerView,
            });
        case TOGGLE_ROUTE_PLANNER:
            return Object.assign({}, state, {
                startLocationSearch: initialState.startLocationSearch,
                endLocationSearch: initialState.endLocationSearch,
                routePlannerView: !state.routePlannerView,
            });
        case SET_START_LOCATION_SEARCH:
            return Object.assign({}, state, {
                startLocationSearch: initialState.startLocationSearch.concat(action.payload),
            });
        case SET_END_LOCATION_SEARCH:
            return Object.assign({}, state, {
                endLocationSearch: initialState.endLocationSearch.concat(action.payload),
            });
        case RETURN_MAP_PICKER_RESULT:
            if (state.mapPickerMode == 1) {
                return Object.assign({}, state, {
                    mapPickerResult: initialState.mapPickerResult.concat(action.payload),
                    startLocation: initialState.startLocation.concat(action.payload),
                    startLocationSearch: initialState.startLocationSearch.concat('Pinned location'),
                    mapPickerMode: initialState.mapPickerMode,
                    routePlannerView: !state.routePlannerView,
                });
            } else if (state.mapPickerMode == 2) {
                return Object.assign({}, state, {
                    mapPickerResult: initialState.mapPickerResult.concat(action.payload),
                    endLocation: initialState.endLocation.concat(action.payload),
                    endLocationSearch: initialState.endLocationSearch.concat('Pinned location'),
                    mapPickerMode: initialState.mapPickerMode,
                    routePlannerView: !state.routePlannerView,
                });
            }
        case SEARCH_START_LOCATION_SUCCEEDED:
            return Object.assign({}, state, {
                startLocationSearchResult: initialState.startLocationSearchResult.concat(action.payload)
            });
        case SEARCH_END_LOCATION_SUCCEEDED:
            return Object.assign({}, state, {
                endLocationSearchResult: initialState.endLocationSearchResult.concat(action.payload)
            });
        case PROCESS_START_LOCATION:
            return Object.assign({}, state, {
                startLocationSearchResult: initialState.startLocationSearchResult,
                startLocation: initialState.startLocation.concat(action.payload),
            });
        case PROCESS_END_LOCATION:
            return Object.assign({}, state, {
                endLocationSearchResult: initialState.endLocationSearchResult,
                endLocation: initialState.endLocation.concat(action.payload),
            });
        case PLAN_ROUTE_SUCCEEDED:
            return Object.assign({}, state, {
                navigationRoute: initialState.navigationRoute.concat(action.payload.route),
                onRoute: !initialState.onRoute,
                routeInstruction: initialState.routeInstruction.concat(action.payload.routeInstruction),
            });
        case REROUTE_SUCCEEDED:
            return Object.assign({}, state, {
                stepNo: initialState.stepNo,
                onRoute: !initialState.onRoute,
                navigationRoute: initialState.navigationRoute.concat(action.payload.route),
                routeInstruction: initialState.routeInstruction.concat(action.payload.routeInstruction),
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
        case RUN_HISTORY:
            return Object.assign({}, state, {
                navigationRoute: initialState.navigationRoute.concat(action.payload.routeInformation),
                onRoute: !initialState.onRoute,
                routeInstruction: initialState.routeInstruction.concat(action.payload.routeInformation.data.routes[0].legs[0].steps),
                startLocation: initialState.startLocation.concat(action.payload.startLocation),
                endLocation: initialState.endLocation.concat(action.payload.endLocation),
                routeName: initialState.routeName.concat(action.payload.routeName),
            });
        case CANCEL_ROUTE:
            return Object.assign({}, state, {
                ...initialState,
                navigationRoute: initialState.navigationRoute,
            });
        case FILTER_ROUTE_ERP:
            return Object.assign({}, state, {
                erpFiltered: initialState.erpFiltered.concat(action.payload)
            });
        case SAVE_ROUTE_NAME:
            return Object.assign({}, state, {
                routeName: initialState.routeName.concat(action.payload)
            });
        default:
    } // end of switch case
    return state;
}

export default NavigationReducer;