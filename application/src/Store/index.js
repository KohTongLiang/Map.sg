import { createStore } from "redux";
import rootReducer from "../Reducer";

/* *
 * This is the application store. The store serves as a container for the application state
 * 
 * @Koh Tong Liang
 * @Version 1.0
 * @Since 30/10/2020
 * */
export default createStore(rootReducer);