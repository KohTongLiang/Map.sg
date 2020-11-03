import React from "react";
import { shallow, mount } from "enzyme";

import MapReducer from '../Reducer/MapReducer'
import {MapState} from '../Reducer/MapReducer'


describe('MapReducer ', () => {
    test('should return the initial state', () => {
      expect(MapReducer(undefined, {})).toMatchSnapshot()
    })
  
    test('should handle UPDATE_CAMERA_MARKERS', () => {
      expect(
        MapReducer(MapState,
        {
          type: 'UPDATE_CAMERA_MARKERS'
        })
      ).toMatchSnapshot()
    })
  
    test('should handle GET_TRAFFIC_IMAGES_SUCCEEDED', () => {
      expect(
        MapReducer(MapState,
        {
          type: 'GET_TRAFFIC_IMAGES_SUCCEEDED'
        })
      ).toMatchSnapshot()
    })
  
    test('should handle UPDATE_NEXT_CAMERA', () => {
      expect(
        MapReducer(MapState,
        {
          type: 'UPDATE_NEXT_CAMERA'
        })
      ).toMatchSnapshot()
    })
  })
