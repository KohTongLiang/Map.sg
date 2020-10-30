import { combineReducers } from 'redux';
import HomeReducer from './HomeReducer';
import NavigationReducer from './NavigationReducer';

/* *
 * This is the root reducers, it uses combineReducers to group multiple reducers together
 * and export all of them at 1 go. This serves as entry point to all the other reducers.
 * 
 * @Koh Tong Liang
 * @Version 1.0
 * @Since 30/10/2020
 * */

export default combineReducers({ HomeReducer, NavigationReducer });
