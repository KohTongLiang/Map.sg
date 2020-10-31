import { put, takeEvery, call } from 'redux-saga/effects';
import { SEARCH_START_LOCATION, SEARCH_START_LOCATION_SUCCEEDED, SEARCH_END_LOCATION_SUCCEEDED, SEARCH_END_LOCATION,
    PLAN_ROUTE, PLAN_ROUTE_SUCCEEDED } from '../Constants/actionTypes';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

const accessToken = process.env.REACT_APP_MAPBOX_KEY;
/**
 * Navigation saga, used to handle side-effects like AJAX/API calls for navigation view
 * 
 * @Koh Tong Liang
 * @Version 1
 * @Since 31/10/2020
 */
 /**
  * Executes relavant functions when certain actions are detected. Saga remains idle and listening when no action is detected
  * @param {*} action 
  */
 export default function* NavigationSaga() {
    yield takeEvery(SEARCH_START_LOCATION, handleSearchStartLocation);
    yield takeEvery(SEARCH_END_LOCATION, handleSearchEndLocation);
    yield takeEvery(PLAN_ROUTE, handlePlanRoute);
 }

 /**
  * Calls Mapbox API for possible location based on user search term
  * @param {*} action 
  */
 function* handleSearchStartLocation(action) {
     try {
         const payload = yield call(
            () => (axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${action.payload}.json`,{
                params: {
                    access_token: accessToken,
                    country: 'sg',
                }
            }).then(function (response) {
                var result = response.data.features;
                return result;
            })
         ));
         yield put({ type: SEARCH_START_LOCATION_SUCCEEDED, payload})
     } catch (error) {
         console.log(error)
     }
 } // end of handleSearchStartLocation

 /**
  * Calls Mapbox API for possible location based on user search term
  * @param {*} action 
  */
 function* handleSearchEndLocation(action) {
    try {
        const payload = yield call(
           () => (axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${action.payload}.json`,{
               params: {
                   access_token: accessToken,
                   country: 'sg',
               }
           }).then(function (response) {
               var result = response.data.features;
               return result;
           })
        ));
        yield put({ type: SEARCH_END_LOCATION_SUCCEEDED, payload})
    } catch (error) {
        console.log(error)
    }
} // end of handleSearchEndLocation

/**
  * Calls Mapbox API to get a route object using start and end locations
  * @param {*} action 
  */
function* handlePlanRoute(action) {
    try {
        const payload = yield call(
           () => (axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${action.payload.startLocation[0].lng},${action.payload.startLocation[0].lat};${action.payload.endLocation[0].lng},${action.payload.endLocation[0].lat}`,{
                    params: {
                        access_token: mapboxgl.accessToken,
                        steps: true,
                        banner_instructions: true,
                        voice_instructions: true,
                        geometries: 'geojson',
                    }
                }).then(function (response) {
                    // dispatch({ type: PLAN_ROUTE, payload: response });
                    return response;
                })
            ));
        yield put({ type: PLAN_ROUTE_SUCCEEDED, payload})
    } catch (error) {
        console.log(error)
    }
} // end of handlePlanRoute