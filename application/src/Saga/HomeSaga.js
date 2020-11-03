import { put, apply, fork, take, takeEvery, call, takeLatest, delay } from 'redux-saga/effects';
import { GET_USER_LOCATION, GET_USER_LOCATION_SUCCEEDED } from '../Constants/actionTypes';
import SagaObservable from 'saga-observable'

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


export function* handleGetUserLocation(options = { enableHighAccuracy: true }) {
    if ( ! navigator.geolocation ) {
      console.warn('User Position can not be used, check permissions or update browser.')
      return;
    }
    const observer = new SagaObservable({ /* ... config ... */ })
    let id
    try {
      id = navigator.geolocation.watchPosition(
        observer.publish, observer.publish, options
      )
      while(true) {
        const location = yield apply(observer, observer.next)
        // handle new data via [yield fork]
        yield put({
            type: GET_USER_LOCATION_SUCCEEDED, payload: { lng: location[0].coords.longitude, lat: location[0].coords.latitude }
          })
      }
    } catch (e) {
      // handle errors
    } finally {
      if ( observer.cancelled() ) {
        // handle cancellation
      }
      navigator.geolocation.clearWatch(id)
    }
  }