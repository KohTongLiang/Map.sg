import { GET_USER_LOCATION, TOGGLE_ROUTE_PLANNER, TOGGLE_TRAFFIC_IMAGES_VIEW } from '../Constants/actionTypes';


/**
 * Home reducers to update states belonging to Home view
 * 
 * @Koh Tong Liang
 * @Version 1
 * @Since 31/10/2020
*/

const initialState = {
    routePlannerView: false,
    trafficImagesView: false,
    userLocation: {}
}

function homeReducer (state = initialState, action) {

    // determine what action to perform and which state to update
    switch (action.type) {
        case GET_USER_LOCATION:
            break;
         
        case TOGGLE_ROUTE_PLANNER:
            return Object.assign({}, state, {
                routePlannerView: !state.routePlannerView
            });
        
        case TOGGLE_TRAFFIC_IMAGES_VIEW:
            break;
        default:
    } // end of switch case

    return state;
}

export default homeReducer;