
import { SIGN_UP, SIGN_IN, SIGN_OUT, CLEAR_ERROR_MESSAGE } from '../Constants/actionTypes';


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