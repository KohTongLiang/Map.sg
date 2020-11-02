
import { SIGN_UP, SIGN_IN, SIGN_OUT, CLEAR_ERROR_MESSAGE, SAVE_HISTORY, LOAD_HISTORY, DELETE_HISTORY } from '../Constants/actionTypes';


export function signIn (payload) {
    return { type: SIGN_IN, payload };
}

export function signUp (payload) {
    return { type: SIGN_UP, payload };
}

export function signOut () {
    return { type: SIGN_OUT };
}

export function clearErrorMessage () {
    return { type: CLEAR_ERROR_MESSAGE, };
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