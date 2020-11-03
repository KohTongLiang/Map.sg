import { put, takeEvery, call, takeLatest, delay } from 'redux-saga/effects';
import { GET_USER_LOCATION, GET_USER_LOCATION_SUCCEEDED, PROCESS_START_LOCATION } from '../Constants/actionTypes';

/**
 * Home saga, used to handle side-effects like AJAX/API calls for Home view.
 * 
 * @Koh Tong Liang
 * @Version 1
 * @Since 31/10/2020
 */
export default function* HomeSaga() {
    yield takeEvery(GET_USER_LOCATION, handleGetUserLocation);
}

function* handleGetUserLocation (action) {
    try {
        // console.log(payload);
        const payload = action.payload;
    //     const result = yield call(() => new Promise((resolve, reject) => {
    //         navigator.geolocation.watchPosition(
    //             location => resolve(location),
    //             error => reject(error),
    //         );
    //     }));

    //     const payload = {lng: result.coords.longitude, lat: result.coords.latitude }
        yield put({ type: GET_USER_LOCATION_SUCCEEDED, payload});
        yield put({ type: PROCESS_START_LOCATION, payload });
        // delay(5000);
    } catch (error) {
        console.log(error);
    }
        // yield put({ type: GET_USER_LOCATION_SUCCEEDED, payload});
        // yield put({ type: PROCESS_START_LOCATION, payload });
} // end of handleGetUserLocation