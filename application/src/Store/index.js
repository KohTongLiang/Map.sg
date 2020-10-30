import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../Reducer";
import thunk from 'redux-thunk';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* *
 * This is the application store. The store serves as a container for the application state
 * 
 * @Koh Tong Liang
 * @Version 1.0
 * @Since 30/10/2020
 * */
export default createStore(
    rootReducer,
    storeEnhancers(applyMiddleware(thunk))
    );