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
import { ExpansionPanelActions } from "@material-ui/core";
import Store from "./Store";
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

describe("API Unit Testing", () => {

    const store = Store;
    
    it("valid Start Location", async () => { 
        //mock map Api files

        const payload = '100055';
        await store.dispatch(searchStartLocation(payload));
        console.log(store.getState().NavigationReducer.startLocationSearchResult);
        expect(store.getState().NavigationReducer.startLocationSearchResult).not.toEqual("");
    })

});


/* Example code
import { runSaga } from 'redux-saga'
import { mockSaga } from 'redux-saga-mock'
import saga from './mysaga'

const MOCK_RESPONSE = {
  json: () => Promise.resolve({ field: 'some data' })
}

it('sample unit test', () => {
  const testSaga = mockSaga(saga)
  
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
