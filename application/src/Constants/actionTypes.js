/**
 * Action types constants use to define an action type.
 * 
 * @Koh Tong Liang
 * @Version 1
 * @Since 30/10/2020
 */

/**
 * Action types for Home Actions
 */
export const GET_USER_LOCATION = 'GET_USER_LOCATION';
export const TOGGLE_TRAFFIC_IMAGES_VIEW = 'TOGGLE_TRAFFIC_IMAGES_VIEW';
export const TOGGLE_ROUTE_PLANNER = 'TOGGLE_ROUTE_PLANNER';
export const GET_USER_LOCATION_SUCCEEDED = 'GET_USER_LOCATION_SUCCEEDED';

/**
 * Action types for Map Actions
 */
export const GET_TRAFFIC_IMAGES = 'GET_TRAFFIC_IMAGES';
export const GET_TRAFFIC_IMAGES_SUCCEEDED = 'GET_TRAFFIC_IMAGES_SUCCEEDED';
export const GET_ERP_DATA = 'GET_ERP_DATA';
export const GET_ERP_DATA_SUCCEEDED = 'GET_ERP_DATA_SUCCEEDED';
export const UPDATE_STEPS = 'UPDATE_STEPS';
export const UPDATE_CAMERA_MARKERS = 'UPDATE_CAMERA_MARKERS';

/**
 * Action types for Navigation/Route Planner
 */
export const SEARCH_START_LOCATION = 'SEARCH_START_LOCATION';
export const SEARCH_START_LOCATION_SUCCEEDED = 'SEARCH_START_LOCATION_SUCCEEDED';
export const SEARCH_END_LOCATION = 'SEARCH_END_LOCATION';
export const SEARCH_END_LOCATION_SUCCEEDED = 'SEARCH_END_LOCATION_SUCCEEDED';
export const PROCESS_START_LOCATION = 'PROCESS_START_LOCATION';
export const PROCESS_END_LOCATION = 'PROCESS_END_LOCATION';
export const PLAN_ROUTE = 'PLAN_ROUTE';
export const PLAN_ROUTE_SUCCEEDED = 'PLAN_ROUTE_SUCCEEDED';
export const TRIP_SUMMARY = 'TRIP_SUMMARY';
export const SAVE_TRIP = 'SAVE_TRIP';
export const MAP_MATCHING = 'MAP_MATCHING';
export const MAP_MATCHING_SUCCEEDED = 'MAP_MATCHING_SUCCEEDED';

/**
 * Action types for Settings
 */
export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';

/**
 * Action types for History
 */
export const SAVE_ROUTE = 'SAVE_ROUTE';
export const LOAD_ROUTE = 'LOAD_ROUTE';

/**
 * Action types for Authentication
 */
export const SIGN_IN = 'SIGN_UP';
export const SIGN_UP = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';