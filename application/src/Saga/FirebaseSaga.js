// import redux-saga components
import { put, takeEvery, call, fork, take } from 'redux-saga/effects';

// import firebase context
import firebaseApp from '../Firebase';

// import action types
import {
  SIGN_UP, SIGN_IN, SIGN_OUT, SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_IN_FAILURE, SIGN_OUT_FAILURE,
  SAVE_HISTORY, LOAD_HISTORY, SAVE_HISTORY_SUCCESS, LOAD_HISTORY_SUCCESS, DELETE_HISTORY, TOGGLE_BOOKMARK
} from '../Constants/actionTypes';

/**
 * Firebase saga, used to handle firebase authentication and interactions between app and firestore.
 * @author Koh Tong Liang
 * @version 1
 * @since 31/10/2020
 */

// define the actions that the saga needs to listen for and attach a function handler
// to define the function to execute once action has been performed
export default function* FirebaseSaga() {
  yield fork(loginStatusWatcher);
  yield takeEvery(SIGN_IN, handleSignIn);
  yield takeEvery(SIGN_OUT, handleSignOut);
  yield takeEvery(SIGN_UP, handleSignUp);
  yield takeEvery(SAVE_HISTORY, handleSaveHistory);
  yield takeEvery(LOAD_HISTORY, handleLoadHistory);
  yield takeEvery(DELETE_HISTORY, handleDeleteHistory);
  yield takeEvery(TOGGLE_BOOKMARK, handleToggleBookmark)
}

// bookmark/unbookmark a past route and update the data on firestore
function* handleToggleBookmark(action) {
  try {
    yield call(firebaseApp.firestore.setDocument, 'users/' + action.payload.userId + '/saved_route/' + action.payload.routeId, {
      bookmark: action.payload.bookmark,
    }, { merge: true });
    yield put({ type: LOAD_HISTORY, payload: action.payload });
  } catch (error) {
    console.log(error);
  }
}

// save route and its relevant information to firestore
function* handleSaveHistory(action) {
  try {
    const doc = yield call(firebaseApp.firestore.addDocument, 'users/' + action.payload.userId + '/saved_route', {
      route_information: JSON.stringify(action.payload.navigationRoute),
      route_name: action.payload.routeName,
      start_location: action.payload.startLocation,
      end_location: action.payload.endLocation,
      date_added: new Date().toISOString().slice(0, 10).toString() + " " + new Date().toISOString().slice(12, 20).toString(),
      bookmark: false,
    });
    yield put({ type: LOAD_HISTORY, payload: action.payload })
    yield put({ type: SAVE_HISTORY_SUCCESS })
  } catch (error) {
    console.log(error);
  }
}

// load past route stored on firestore and pass the data to reducer which would in turn update the state
function* handleLoadHistory(action) {
  try {
    const snapshot = yield call(firebaseApp.firestore.getCollection, 'users/' + action.payload.userId + '/saved_route');
    let routes = [];
    snapshot.forEach(s => {
      routes.push([s.id, s.data()])
    });
    yield put({ type: LOAD_HISTORY_SUCCESS, payload: routes });
  } catch (error) {
    console.log(error);
  }
}

// delete a defined route from firestore and update existing state storing the list of past routes
function* handleDeleteHistory(action) {
  try {
    yield call(firebaseApp.firestore.deleteDocument, 'users/' + action.payload.userId + '/saved_route/' + action.payload.historyId);
    yield put({ type: LOAD_HISTORY, payload: action.payload })
  } catch (error) {
    console.log(error);
  }
}

// Authentication related generators

// Handler to perform sign up action. Takes input by user and create a user account on firebase authentication service
function* handleSignUp(action) {
  try {
    const data = yield call(firebaseApp.auth.createUserWithEmailAndPassword, action.payload.email, action.payload.password);
    const doc = yield call(firebaseApp.firestore.addDocument, 'users', {
      email: action.payload.email,
      gender: action.payload.gender,
      username: action.payload.username,
    });
    if (doc) {
      yield put({ type: SIGN_UP_SUCCESS, data });
    } else {
      yield put({ type: SIGN_UP_FAILURE, payload: 'Failed to create user' })
    }
  }
  catch (error) {
    yield put({ type: SIGN_IN_FAILURE, payload: error.message });
  }
}

// Handler to perform sign in action and load necessary user information from firestore into session information
function* handleSignIn(action) {
  try {
    const data = yield call(firebaseApp.auth.signInWithEmailAndPassword, action.payload.email, action.payload.password);
    yield put({ type: SIGN_IN_SUCCESS, data })
  }
  catch (error) {
    yield put({ type: SIGN_IN_FAILURE, payload: error.message });
  }
}

// Handler to end current user session
function* handleSignOut() {
  try {
    yield call(firebaseApp.auth.signOut);
    yield put({ SIGN_OUT_SUCCESS });
  }
  catch (error) {
    yield put({ type: SIGN_OUT_FAILURE, payload: error.message });
  }
}

// When user signs into their account via the sign in handler, create a user session so that user can access
// features requiring authentication
function* loginStatusWatcher() {
  const channel = yield call(firebaseApp.auth.channel)

  while (true) {
    const { user } = yield take(channel)
    if (user) {
      yield put({ type: SIGN_IN_SUCCESS, data: user });
    } else {
      yield put({ type: SIGN_OUT_SUCCESS })
    }
  }
}