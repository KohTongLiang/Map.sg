import { takeEvery, call, put } from "redux-saga/effects";

/**
 * Map root file of redux saga. Redux saga serves as a parallel thread that functions in the background
 * primarily used to manage API calls
 * @Koh Tong Liang
 * @Version 1
 * @Since 30/10/2020
*/
export default function* watcherSaga() {
  yield takeEvery("DATA_REQUESTED", workerSaga);
}

function* workerSaga() {
  try {
    const payload = yield call(getData);
    yield put({ type: "DATA_LOADED", payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function getData() {
  return fetch("https://jsonplaceholder.typicode.com/posts").then(response =>
    response.json()
  );
}