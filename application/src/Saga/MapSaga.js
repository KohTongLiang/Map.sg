import { put, takeEvery, takeLatest, call, delay } from 'redux-saga/effects';
import { GET_TRAFFIC_IMAGES, GET_ERP_DATA,GET_TRAFFIC_IMAGES_SUCCEEDED, GET_ERP_DATA_SUCCEEDED } from '../Constants/actionTypes';
import axios from 'axios';
const accessToken = process.env.REACT_APP_MAPBOX_KEY;


/**
 * Map saga, used to handle side-effects like AJAX/API calls for map view.
 * Both functions used to get traffic images and erp rates will refresh in a set timing automatically
 * 
 * @Koh Tong Liang
 * @Version 1
 * @Since 31/10/2020
 */

 export default function* MapSaga() {
    yield takeLatest(GET_TRAFFIC_IMAGES, handleGetTrafficImages)
    yield takeLatest('disabled', handleGetErpData);
 }

 function* handleGetTrafficImages () {
    try {
        const payload = yield call(
           () => (axios.get('https://api.data.gov.sg/v1/transport/traffic-images')
           .then(function (response) {
               return response.data.items[0].cameras;
           })
        ));
        yield put({ type: GET_TRAFFIC_IMAGES_SUCCEEDED, payload})
        yield delay(20000);
    } catch (error) {
        console.log(error)
    }
 }

 // temporarily disabled
 function* handleGetErpData () {
    try {
        const payload = yield call(
            //https://cors-anywhere.herokuapp.com/ is a workaround for CORS related errors that sometimes occurs
           () => (axios.get('https://cors-anywhere.herokuapp.com/http://datamall2.mytransport.sg/ltaodataservice/ERPRates',{
                headers: {
                    'AccountKey' : 'oeIw+flHT8CMv/MTFMtY1A==',
                }
            }).then(function (response) {
               return response;
           })
        ));
        yield delay(20000);
        yield put({ type: 'TUT', payload})
    } catch (error) {
        console.log(error)
    }
}