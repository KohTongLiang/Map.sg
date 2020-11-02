
import React from "react";
import { shallow, mount } from "enzyme";
import FirebaseReducer from '../Reducer/FirebaseReducer'
import {FirebaseState} from '../Reducer/FirebaseReducer'

describe('FirebaseReducer ', () => {
    test('should return the initial state', () => {
      expect(FirebaseReducer(undefined, {})).toMatchSnapshot()
    })
  
    test('should handle LOAD_HISTORY_SUCCESS', () => {
      expect(
        FirebaseReducer(FirebaseState,
        {
          type: 'LOAD_HISTORY_SUCCESS'
        })
      ).toMatchSnapshot()
    })
  
    test('should handle SIGN_IN_SUCCESS', () => {
      expect(
        FirebaseReducer(FirebaseState,
        {
          type: 'SIGN_IN_SUCCESS'
        })
      ).toMatchSnapshot()
    })
  
    test('should handle SIGN_OUT_SUCCESS', () => {
      expect(
        FirebaseReducer(FirebaseState,
        {
          type: 'SIGN_OUT_SUCCESS'
        })
      ).toMatchSnapshot()
    })

    test('should handle SIGN_UP_SUCCESS', () => {
        expect(
          FirebaseReducer(FirebaseState,
          {
            type: 'SIGN_UP_SUCCESS'
          })
        ).toMatchSnapshot()
      })

      test('should handle SIGN_IN_FAILURE', () => {
        expect(
          FirebaseReducer(FirebaseState,
          {
            type: 'SIGN_IN_FAILURE'
          })
        ).toMatchSnapshot()
      })

      test('should handle SIGN_OUT_FAILURE', () => {
        expect(
          FirebaseReducer(FirebaseState,
          {
            type: 'SIGN_OUT_FAILURE'
          })
        ).toMatchSnapshot()
      })
      test('should handle SIGN_UP_FAILURE', () => {
        expect(
          FirebaseReducer(FirebaseState,
          {
            type: 'SIGN_UP_FAILURE'
          })
        ).toMatchSnapshot()
      })
      test('should handle CLEAR_ERROR_MESSAGE', () => {
        expect(
          FirebaseReducer(FirebaseState,
          {
            type: 'CLEAR_ERROR_MESSAGE'
          })
        ).toMatchSnapshot()
      })
  })