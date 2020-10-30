import { SEARCH_START_LOCATION, SEARCH_END_LOCATION, PLAN_ROUTE } from '../Constants/actionTypes';

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
        case PLAN_ROUTE:
            break;
        default:
    } // end of switch case

    return state;
}

export default NavigationReducer;