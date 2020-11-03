import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../Reducer";
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../Saga';


/* *
 * This is the application store. The store serves as a container for the application state
 * 
 * @Koh Tong Liang
 * @Version 1.0
 * @Since 30/10/2020
 * */

 /**
  * Define storeEnhancers and middlewares that will be used
  */
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();


export default createStore(
    rootReducer,
    storeEnhancers(applyMiddleware(sagaMiddleware))
    );

/**
 * Load sagas into sagaMiddleware
 */
sagaMiddleware.run(rootSaga);