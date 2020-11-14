import NavigationReducer from '../Reducer/NavigationReducer'
import {NavigationState} from '../Reducer/NavigationReducer'




describe('NavigationReducer ', () => {
    test('should return the initial state', () => {
      expect(NavigationReducer(undefined, {})).toMatchSnapshot()
    })
  
    test('should handle UPDATE_STEPS', () => {
      expect(
        NavigationReducer(NavigationState,
        {
          type: 'UPDATE_STEPS'
        })
      ).toMatchSnapshot()
    })
  
    test('should handle SEARCH_START_LOCATION_SUCCEEDED', () => {
      expect(
        NavigationReducer(NavigationState,
        {
          type: 'SEARCH_START_LOCATION_SUCCEEDED'
        })
      ).toMatchSnapshot()
    })
  
    test('should handle SEARCH_END_LOCATION_SUCCEEDED', () => {
      expect(
        NavigationReducer(NavigationState,
        {
          type: 'SEARCH_END_LOCATION_SUCCEEDED'
        })
      ).toMatchSnapshot()
    })
    test('should handle PROCESS_START_LOCATION', () => {
        expect(
          NavigationReducer(NavigationState,
          {
            type: 'PROCESS_START_LOCATION'
          })
        ).toMatchSnapshot()
      })
      test('should handle PROCESS_END_LOCATION', () => {
        expect(
          NavigationReducer(NavigationState,
          {
            type: 'PROCESS_END_LOCATION'
          })
        ).toMatchSnapshot()
      })
      test('should handle REROUTE_SUCCEEDED', () => {
        expect(
          NavigationReducer(NavigationState,
          {
            type: 'REROUTE_SUCCEEDED'
          })
        ).toMatchSnapshot()
      })
      test('should handle MAP_MATCHING_SUCCEEDED', () => {
        expect(
          NavigationReducer(NavigationState,
          {
            type: 'MAP_MATCHING_SUCCEEDED'
          })
        ).toMatchSnapshot()
      })
      test('should handle TRIP_SUMMARY', () => {
        expect(
          NavigationReducer(NavigationState,
          {
            type: 'TRIP_SUMMARY'
          })
        ).toMatchSnapshot()
      })
      test('should handle CANCEL_ROUTE', () => {
        expect(
          NavigationReducer(NavigationState,
          {
            type: 'CANCEL_ROUTE'
          })
        ).toMatchSnapshot()
      })
      test('should handle FILTER_ROUTE_ERP', () => {
        expect(
          NavigationReducer(NavigationState,
          {
            type: 'FILTER_ROUTE_ERP'
          })
        ).toMatchSnapshot()
      })
      test('should handle SAVE_ROUTE_NAME', () => {
        expect(
          NavigationReducer(NavigationState,
          {
            type: 'SAVE_ROUTE_NAME'
          })
        ).toMatchSnapshot()
      })
  })
