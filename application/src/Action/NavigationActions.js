import { SEARCH_START_LOCATION, SEARCH_END_LOCATION, PLAN_ROUTE, PROCESS_START_LOCATION, PROCESS_END_LOCATION } from '../Constants/actionTypes';

/**
 * Navigation action definitions.
 * 
 * @Koh Tong Liang
 * @Version 1
 * @Since 31/10/2020
*/

/**
 * Perform searchStartLocation action, triggers saga to make api calls.
 */
export function searchStartLocation (payload) {
    return { type: SEARCH_START_LOCATION, payload }
}

export function searchEndLocation (payload) {
    return { type: SEARCH_END_LOCATION, payload }
}

export function processStartLocation (payload) {
    return { type: PROCESS_START_LOCATION, payload }
}

export function processEndLocation (payload) {
    return { type: PROCESS_END_LOCATION, payload }
}

export function planRoute (startLocation, endLocation) {
    return { type: PLAN_ROUTE, payload: { startLocation, endLocation } }
}