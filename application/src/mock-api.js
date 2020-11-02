/** Referenced from https://reime005.medium.com/redux-saga-mock-api-and-blackbox-testing-885434396f4f */

import fetchMock from 'fetch-mock';

fetchMock.get(`glob:https://api.mapbox.com/geocoding/v5/mapbox.places/${action.payload}.json`, () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        status: 200,
        body: { increment: 1 },
      });
    }, 1000) // simulate server work/load
  });
});


fetchMock.get(`glob:https://example-api.com/test`, () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        status: 200,
        body: { increment: 1 },
      });
    }, 1000) // simulate server work/load
  });
});


/**
  * Calls Mapbox API for possible location based on user search term
  * @param {*} action 
  */
 function* handleSearchStartLocation (action) {
    try {
        const payload = yield call(
           () => (axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${action.payload}.json`,{
               params: {
                   access_token: accessToken,
                   country: 'sg',
               }
           }).then(function (response) {
               var result = response.data.features;
               return result;
           })
        ));
        yield put({ type: SEARCH_START_LOCATION_SUCCEEDED, payload})
    } catch (error) {
        console.log(error)
    }
} // end of handleSearchStartLocation
