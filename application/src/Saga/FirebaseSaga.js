import firebase from 'firebase'
import firebaseApp from '../Firebase';

import { put, takeEvery, call, fork, take } from 'redux-saga/effects';
import { SIGN_UP, SIGN_IN, SIGN_OUT, SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_IN_FAILURE, SIGN_OUT_FAILURE } from '../Constants/actionTypes';


const authProvider = new firebase.auth.GoogleAuthProvider()

export default function* FirebaseSaga() {
  yield fork(loginStatusWatcher);
  yield takeEvery(SIGN_IN, handleSignIn);
  yield takeEvery(SIGN_OUT, handleSignOut);
  yield takeEvery(SIGN_UP, handleSignUp);
}

function* handleSignUp(action) {
    try {
      const user = yield call(firebaseApp.auth.createUserWithEmailAndPassword, action.payload.email, action.payload.password);
      yield put(SIGN_UP_SUCCESS(user));
    }
    catch(error) {
    //   yield put(createUserFailure(error));
        yield put({ type: SIGN_UP_FAILURE, payload: error.message })
        console.log(error);
    }
}

function* handleSignIn(action) {
    try {
      const data = yield call(firebaseApp.auth.signInWithEmailAndPassword, action.payload.email, action.payload.password);
    //   yield put(SIGN_IN_SUCCESS(data));
      yield put({ type: SIGN_IN_SUCCESS, data })
    }
    catch(error) {
    //   yield put(loginFailure(error));
        yield put({ type: SIGN_IN_FAILURE, payload: error.message });
        console.log(error);
    }
}

function* handleSignOut() {
    try {
      const data = yield call(firebaseApp.auth.signOut);
      yield put({SIGN_OUT_SUCCESS});
    }
    catch(error) {
    //   yield put(signOutFailure(error));
        yield put({ type: SIGN_OUT_FAILURE, payload: error.message });
        console.log(error);
    }
}

function* loginStatusWatcher () {
  const channel = yield call(firebaseApp.auth.channel)

  while (true) {
    const { user } = yield take(channel)
    if (user) {
      yield put({ type: SIGN_IN_SUCCESS, data: user });
    } else {
      yield put({ type: SIGN_OUT_SUCCESS })
    }
  }
} //