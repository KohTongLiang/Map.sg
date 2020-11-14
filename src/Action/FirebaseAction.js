// import action types
import { SIGN_UP, SIGN_IN, SIGN_OUT, CLEAR_ERROR_MESSAGE, SAVE_HISTORY, LOAD_HISTORY, DELETE_HISTORY } from '../Constants/actionTypes';

/**
 * Action definitions. Defines action input, types and payload that will be delivered to the reducers.
 * FirebaseAction defines actions that is required for view to interact with firebase services
 * 
 * @author Koh Tong Liang
 * @version 1
 * @since 30/10/2020
 */

 /**
  * Takes in sign in credentials
  */
export function signIn (payload) {
    return { type: SIGN_IN, payload };
}

export function signUp (payload) {
    return { type: SIGN_UP, payload };
}

export function signOut () {
    return { type: SIGN_OUT };
}


export function saveHistory (payload) {
    return { type: SAVE_HISTORY, payload };
} 

export function loadHistory (payload) {
    return { type: LOAD_HISTORY, payload };
} 

export function deleteHistory (payload) {
    return { type: DELETE_HISTORY, payload };
} 