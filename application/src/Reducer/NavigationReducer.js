import { SEARCH_START_LOCATION, SEARCH_END_LOCATION, PLAN_ROUTE, PROCESS_START_LOCATION, PROCESS_END_LOCATION } from '../Constants/actionTypes';

/**
 * Home reducers to update states belonging to Home view
 * 
 * @Koh Tong Liang
 * @Version 1
 * @Since 31/10/2020
*/

const initialState = {
    startLocation: [],
    endLocation: [],
    startLocationSearchResult: [],
    endLocationSearchResult: [],
    navigationRoute: []
}

function NavigationReducer (state = initialState, action) {

    // determine what action to perform and which state to update
    switch (action.type) {
        case SEARCH_START_LOCATION:
            return Object.assign({}, state, {
                startLocationSearchResult: state.startLocationSearchResult.concat(action.payload)
            });
         
        case SEARCH_END_LOCATION:
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
        case PLAN_ROUTE:
            return Object.assign({}, state, {
                navigationRoute: state.navigationRoute.concat(action.payload),
            });
        default:
    } // end of switch case

    return state;
}

export default NavigationReducer;