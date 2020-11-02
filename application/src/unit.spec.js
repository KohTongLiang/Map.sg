/*
import React from "react";
import { shallow, mount } from "enzyme";
import withRouter from './Components/Authentication/SignIn';

import MapReducer from './Reducer/MapReducer'
import {initialState} from './Reducer/MapReducer'

describe('MapReducer ', () => {
    test('should return the initial state', () => {
      expect(MapReducer(undefined, {})).toMatchSnapshot()
    })
  
    test('should handle UPDATE_CAMERA_MARKERS', () => {
      expect(
        MapReducer(initialState,
        {
          type: 'UPDATE_CAMERA_MARKERS'
        })
      ).toMatchSnapshot()
    })
  
    test('should handle GET_TRAFFIC_IMAGES_SUCCEEDED', () => {
      expect(
        MapReducer(initialState,
        {
          type: 'GET_TRAFFIC_IMAGES_SUCCEEDED'
        })
      ).toMatchSnapshot()
    })
  
    test('should handle UPDATE_NEXT_CAMERA', () => {
      expect(
        MapReducer(initialState,
        {
          type: 'UPDATE_NEXT_CAMERA'
        })
      ).toMatchSnapshot()
    })
  })
*/
import Store from "./Store";

import SagaTester from "redux-saga-tester";
import { rootSaga } from "./Saga/index";
import { combineReducers } from "./Reducer/index";


const { searchStartLocation } = require("./Action/NavigationActions");
const { getTrafficImages } = require("./Action/MapActions");



jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    GeolocateControl: jest.fn(),
    Map: jest.fn(() => ({
      addControl: jest.fn(),
      on: jest.fn(),
      remove: jest.fn(),
    })),
    NavigationControl: jest.fn(),
  }));

describe("API Unit Testing (Saga)", () => {

    const store = Store;

    it("Valid Start Location: \"100055\"", async () => { 
        const sagaTester = sagaTester({ reducers: combineReducers })
        const delay = (t) => new Promise(res => setTimeout(() => res(), t));

        const payload = "100055";
        sagaTester.dispatch(searchStartLocation(payload));
        const state = sagaTester.getState();

        expect(state.NavigationReducer.startLocationResult).toEqual(4);
    })

});


/* Example code
import { runSaga } from 'redux-saga'
import { mockSaga } from 'redux-saga-mock'
import saga from './mysaga'



it('sample unit test', () => {
          //mock map Api files
        const testSaga = mockSaga(saga)
        const MOCK_RESPONSE = {
            json: () => Promise.resolve({ field: 'some data' })
          }
        testSaga.stubCall(window.fetch, () => Promise.resolve(MOCK_RESPONSE))
        testSaga.stubCall(someFunction, () => {})
  return runSaga(testSaga(), {}).done
    .then(() => {
      const query = testSaga.query()
      assert.isTrue(query.callWithArgs(someFunction, 'some data').isPresent)
      assert.isTrue(query.putAction({ type: 'someAction', data: 'some data' }).isPresent)
    })
})
*/
/*

import SagaTester from "redux-saga-tester";
import { rootSaga, queuedSagaAction } from "../rootSaga";
import { rootReducer } from "../rootReducer";

// enable mock api so that test environment goes against fake server
require('../../mock-api.js');

const delay = (t) => new Promise(res => setTimeout(() => res(), t));

describe("root saga", () => {
  it("should handle 4 button clicks one after another", async () => {
    const sagaTester = new SagaTester({
      reducers: rootReducer
    });

    sagaTester.start(rootSaga);

    sagaTester.dispatch(queuedSagaAction());
    sagaTester.dispatch(queuedSagaAction());
    sagaTester.dispatch(queuedSagaAction());
    sagaTester.dispatch(queuedSagaAction());

    await delay(5000); // wait for 4 request * max 1sec each

    const state = sagaTester.getState();

    expect(state.exampleReducer.counter).toEqual(4);
  }, 10000);
});


        const payload = '100055';
        await store.dispatch(searchStartLocation(payload));
        console.log(store.getState().NavigationReducer.startLocationSearchResult);
        expect(store.getState().NavigationReducer.startLocationSearchResult).not.toEqual("");
 
 */