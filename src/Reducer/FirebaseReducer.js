// import action types
import {
    SIGN_OUT_SUCCESS, SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, SIGN_IN_FAILURE,
    SIGN_OUT_FAILURE, CLEAR_ERROR_MESSAGE, SAVE_HISTORY_SUCCESS, LOAD_HISTORY_SUCCESS
} from '../Constants/actionTypes';

// Initialise initial values for state
const initialState = {
    loggedIn: false,
    user: null,
    errorMessage: '',
    signInSuccess: false,
    signUpSuccess: false,
    history: [],
}

/**
 * Firebase reducers to update states pertaining to states related to user accounts and data storage
 * @author Koh Tong Liang
 * @version 1
 * @since 31/10/2020
*/
function FirebaseReducer(state = initialState, action) {
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
        default:
    } // end of switch case

    return state;
}

export default FirebaseReducer;