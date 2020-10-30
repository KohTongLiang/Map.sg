import { GET_USER_LOCATION, OPEN_ROUTE_PLANNER } from '../Constants/actionTypes';

/**
 * Action definitions. Defines action input, types and payload that will be delivered to the reducers
 * 
 * @Koh Tong Liang
 * @Version 1
 * @Since 30/10/2020
*/

let userLocation = [];

/**
 * Call on browser location service to provide location of user's device
 */
export const GET_USER_LOCATION = () => ({
    type: GET_USER_LOCATION
});


/**
 * Open route planner menu
 */
export const OPEN_ROUTE_PLANNER = () => ({
    type: OPEN_ROUTE_PLANNER
})