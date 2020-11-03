import { SIGN_OUT_SUCCESS, SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, SIGN_IN_FAILURE, SIGN_OUT_FAILURE, CLEAR_ERROR_MESSAGE, SAVE_HISTORY_SUCCESS, LOAD_HISTORY_SUCCESS } from '../Constants/actionTypes';

/**
 * Home reducers to update states belonging to Home view
 * 
 * @Koh Tong Liang
 * @Version 1
 * @Since 31/10/2020
*/

const initialState = {
    loggedIn: false,
    user: null,
    errorMessage: '',
    signInSuccess: false,
    signUpSuccess: false,
    history: [],
}

function FirebaseReducer (state = initialState, action) {
    // determine what action to perform and which state to update
    switch (action.type) {
        case SAVE_HISTORY_SUCCESS:
            // return Object.assign({}, state, {
            //     history: state.history.concat(action.doc)
            // });
            return;
        case LOAD_HISTORY_SUCCESS:
            return Object.assign({}, state, {
                history: initialState.history.concat(action.payload),
            });
        case SIGN_IN_SUCCESS:
            return Object.assign({}, state, {
                loggedIn: true,
                signInSuccess: !state.signInSuccess,
                user: action.data,
            });
        case SIGN_OUT_SUCCESS:
            return initialState;
        case SIGN_UP_SUCCESS:
            return Object.assign({}, state, {
                loggedIn: true,
                signUpSuccess: !state.signUpSuccess,
                user: action.data,
            });
        case SIGN_IN_FAILURE:
            return Object.assign({}, state, {
                errorMessage: initialState.errorMessage.concat(action.payload)
            });
        case SIGN_OUT_FAILURE:
            return Object.assign({}, state, {
                errorMessage: initialState.errorMessage.concat(action.payload)
            });
        case SIGN_UP_FAILURE:
            return Object.assign({}, state, {
                errorMessage: initialState.errorMessage.concat(action.payload)
            });
        case CLEAR_ERROR_MESSAGE:
            return Object.assign({}, state, {
                errorMessage: initialState.errorMessage
            });
        default:
    } // end of switch case

    return state;
}

export default FirebaseReducer;