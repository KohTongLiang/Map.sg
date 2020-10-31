import { put, takeEvery, call } from 'redux-saga/effects';
import { GET_USER_LOCATION, GET_USER_LOCATION_SUCCEEDED } from '../Constants/actionTypes';

/**
 * Hopme saga, used to handle side-effects like AJAX/API calls for Home view.
 * 
 * @Koh Tong Liang
 * @Version 1
 * @Since 31/10/2020
 */

export default function* HomeSaga() {
    yield takeEvery(GET_USER_LOCATION, handleGetUserLocation);
}

function* handleGetUserLocation () {
    try {
        const payload = yield call(() => new Promise((resolve, reject) => {
            navigator.geolocation.watchPosition(
                location => resolve(location),
                error => reject(error),
            )
        }));

        yield put({ type: GET_USER_LOCATION_SUCCEEDED, payload})
    } catch (error) {
        console.log(error);
    }
} // end of handleGetUserLocation