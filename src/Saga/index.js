// import redux saga components
import { all } from "redux-saga/effects"
import NavigationSaga from './NavigationSaga';
import HomeSaga from './HomeSaga';
import MapSaga from './MapSaga';
import FirebaseSaga from './FirebaseSaga';


/**
 * Root saga, compiles all saga into 1 saga and export together
 * @author Koh Tong Liang
 * @version 1
 * @since 31/10/2020
 */
export default function* rootSaga() {
    yield all([
        NavigationSaga(),
        HomeSaga(),
        MapSaga(),
        FirebaseSaga(),
    ])
}