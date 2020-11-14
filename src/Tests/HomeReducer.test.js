import HomeReducer from '../Reducer/HomeReducer'
import {HomeReducerState} from '../Reducer/HomeReducer'

/* *
   * Test unit for FirebaseReducer.
   * 
   * @author Zhen Wei
   * @version 1.0
   * @since 19/10/2018
   * */
describe('HomeReducer ', () => {
    test('should return the initial state', () => {
      expect(HomeReducer(undefined, {})).toMatchSnapshot()
    })
  
    test('should handle GET_USER_LOCATION_SUCCEEDED', () => {
      expect(
        HomeReducer(HomeReducerState,
        {
          type: 'GET_USER_LOCATION_SUCCEEDED'
        })
      ).toMatchSnapshot()
    })
  
    test('should handle TOGGLE_ROUTE_PLANNER', () => {
      expect(
        HomeReducer(HomeReducerState,
        {
          type: 'TOGGLE_ROUTE_PLANNER'
        })
      ).toMatchSnapshot()
    })
  
    test('should handle HISTORY_VIEW', () => {
      expect(
        HomeReducer(HomeReducerState,
        {
          type: 'HISTORY_VIEW'
        })
      ).toMatchSnapshot()
    })

    test('should handle TOGGLE_TRAFFIC_IMAGES_VIEW', () => {
        expect(
          HomeReducer(HomeReducerState,
          {
            type: 'TOGGLE_TRAFFIC_IMAGES_VIEW'
          })
        ).toMatchSnapshot()
      })
  })
