// import actiont types
import {
    SEARCH_START_LOCATION, SEARCH_END_LOCATION, PLAN_ROUTE, PROCESS_START_LOCATION, PROCESS_END_LOCATION, TRIP_SUMMARY,
    SAVE_TRIP, MAP_MATCHING, CANCEL_ROUTE, REROUTE, UPDATE_STEPS, FILTER_ROUTE_ERP, SAVE_ROUTE_NAME, RUN_HISTORY,
    TOGGLE_BOOKMARK, GET_NAME_OF_PLACE, SET_START_LOCATION_SEARCH,SET_END_LOCATION_SEARCH
} from '../Constants/actionTypes';

/**
 * Action definitions. Defines action input, types and payload that will be delivered to the reducers.
 * 
 * @author Koh Tong Liang
 * @version 1
 * @since 30/10/2020
 */

export function searchStartLocation(payload) {
    return { type: SEARCH_START_LOCATION, payload }
}

export function searchEndLocation(payload) {
    return { type: SEARCH_END_LOCATION, payload }
}

export function processStartLocation(payload) {
    return { type: PROCESS_START_LOCATION, payload }
}

export function processEndLocation(payload) {
    return { type: PROCESS_END_LOCATION, payload }
}

export function planRoute(startLocation, endLocation) {
    return { type: PLAN_ROUTE, payload: { startLocation, endLocation } }
}

export function reroute(userLocation, endLocation) {
    return { type: REROUTE, payload: { userLocation, endLocation } }
}

export function tripSummary() {
    return { type: TRIP_SUMMARY }
}

export function saveTrip(payload) {
    return { type: SAVE_TRIP, payload }
}

export function mapMatching(payload) {
    return { type: MAP_MATCHING, payload }
}

export function updateSteps(payload) {
    return { type: UPDATE_STEPS, payload }
}

export function cancelRoute() {
    return { type: CANCEL_ROUTE }
}

export function filterRouteErp(payload) {
    return { type: FILTER_ROUTE_ERP, payload }
}

export function saveRouteName(payload) {
    return { type: SAVE_ROUTE_NAME, payload }
}

export function runHistory(payload) {
    return { type: RUN_HISTORY, payload }
}

export function toggleBookmark(payload) {
    return { type: TOGGLE_BOOKMARK, payload }
}

export function getNameOfPlace(payload) {
    return { type: GET_NAME_OF_PLACE, payload }
}

export function setStartLocationSearch(payload) {
    return { type: SET_START_LOCATION_SEARCH, payload }
}

export function setEndLocationSearch(payload) {
    return { type: SET_END_LOCATION_SEARCH, payload }
}