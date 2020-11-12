// import redux-saga components
import { put, takeEvery, call } from 'redux-saga/effects';

// import action types
import { GET_USER_LOCATION, GET_USER_LOCATION_SUCCEEDED, PROCESS_START_LOCATION } from '../Constants/actionTypes';

/**
 * Home saga, used to handle side-effects like AJAX/API calls for Home view.
 * @Koh Tong Liang
 * @Version 1
 * @Since 31/10/2020
 */
// define the actions that the saga needs to listen for and attach a function handler
// to define the function to execute once action has been performed
export default function* HomeSaga() {
    yield takeEvery(GET_USER_LOCATION, handleGetUserLocation);
}

// Handler to call browser geolocation service when user or app request to access the gps location
// Forward the result into the reducer to be updated into the relevant state
function* handleGetUserLocation () {
    try {
        const result = yield call(() => new Promise((resolve, reject) => {
            navigator.geolocation.watchPosition(
                location => resolve(location),
                error => reject(error),
            )
        }));
        
        const payload = {lng: result.coords.longitude, lat: result.coords.latitude }
        yield put({ type: GET_USER_LOCATION_SUCCEEDED, payload});
        yield put({ type: PROCESS_START_LOCATION, payload });
    } catch (error) {
        console.log(error);
    }
}