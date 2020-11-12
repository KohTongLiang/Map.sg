import { combineReducers } from 'redux';
import HomeReducer from './HomeReducer';
import NavigationReducer from './NavigationReducer';
import MapReducer from './MapReducer';
import FirebaseReducer from './FirebaseReducer';

/* *
 * This is the root reducers, it uses combineReducers to group multiple reducers together
 * and export all of them at 1 go. This serves as entry point to all the other reducers.
 * @author Koh Tong Liang
 * @version 1.0
 * @since 30/10/2020
 * */

export default combineReducers({ 
    HomeReducer,
    NavigationReducer,
    MapReducer,
    FirebaseReducer,
});
