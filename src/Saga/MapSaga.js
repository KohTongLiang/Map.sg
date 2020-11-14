// import redux-saga components
import { put, takeEvery, call } from 'redux-saga/effects';

// import action types
import { GET_TRAFFIC_IMAGES, GET_ERP_DATA, GET_TRAFFIC_IMAGES_SUCCEEDED, GET_ERP_DATA_SUCCEEDED, SET_FAILURE_MESSAGE } from '../Constants/actionTypes';

// import axios module
import axios from 'axios';




/**
 * Map saga, used to handle side-effects like AJAX/API calls for map view.
 * Both functions used to get traffic images and erp rates will refresh in a set timing automatically
 * @author Jeremiah
 * @version 1
 * @since 31/10/2020
 */
// define the actions that the saga needs to listen for and attach a function handler
// to define the function to execute once action has been performed
export default function* MapSaga() {
    // yield takeLatest(GET_TRAFFIC_IMAGES, handleGetTrafficImages)
    yield takeEvery(GET_ERP_DATA, handleGetErpData);
    yield takeEvery(GET_TRAFFIC_IMAGES, handleGetTrafficImages);
}

// Handler to perform an api call to gov tech API to retrieve traffic images and forward it to the reducer
// to be updated into relevant states
function* handleGetTrafficImages() {
    try {
        const payload = yield call(
            () => (axios.get('https://api.data.gov.sg/v1/transport/traffic-images')
                .then(function (response) {
                    return response.data.items[0].cameras;
                })
            ));
        yield put({ type: GET_TRAFFIC_IMAGES_SUCCEEDED, payload })
    } catch (error) {
        yield put({ type: SET_FAILURE_MESSAGE, payload: error.message });
    }
}

// Handler to perform an api call to datamall API to retrieve ERP information and forward it to the reducer
// to be updated into relevant states
function* handleGetErpData() {
    try {
        const payload = yield call(
            //https://cors-anywhere.herokuapp.com/ is a workaround for CORS related errors that sometimes occurs
            () => (axios.get('https://cors-anywhere.herokuapp.com/http://datamall2.mytransport.sg/ltaodataservice/ERPRates', {
                headers: {
                    'AccountKey': 'oeIw+flHT8CMv/MTFMtY1A==',
                    'accept': 'application/json',
                }
            }).then(function (response) {
                return response.data.value;
            })
            ));
        yield put({ type: GET_ERP_DATA_SUCCEEDED, payload })
    } catch (error) {
        yield put({ type: SET_FAILURE_MESSAGE, payload: error.message });
    }
}