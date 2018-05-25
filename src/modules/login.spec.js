import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import constants from '../constants/login.constants'
import reducer, { login, initialState } from './login'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Login action creators', () => {
  beforeEach(() => {
    global.sessionStorage = jest.genMockFunction();
    global.sessionStorage.setItem = jest.genMockFunction();
    global.sessionStorage.getItem = jest.genMockFunction();
    fetch.resetMocks();
  });

  it('dispatches the correct actions on successful fetch request', () => {
    fetch.mockResponse(JSON.stringify({ token: '9876'}))

    const expectedActions = [
      { type: constants.LOGIN_REQUEST, code: { code: '1234'} },
      { type: constants.LOGIN_SUCCESS, token: '9876' },
    ]
    const store = mockStore(initialState)
    return (
      store
        .dispatch(login('1234'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    )
  })
})

describe('Login reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it(`should handle ${constants.LOGIN_REQUEST}`, () => {
    expect(
      reducer({}, {
        type: constants.LOGIN_REQUEST,
        loading: true,
      })
    ).toEqual(
      {        
        loading: true,
      }
    )
  })
  it(`should handle ${constants.LOGIN_SUCCESS}`, () => {
    expect(
      reducer({}, {
        type: constants.LOGIN_SUCCESS,
        token: '9876',
      })
    ).toEqual(
      {
        access_token: '9876',
        loading: false,
      }
    )
  })
  it(`should handle ${constants.LOGIN_FAILURE}`, () => {
    expect(
      reducer({}, {
        type: constants.LOGIN_FAILURE
      })
    ).toEqual(
      {
        access_token: '',
        loading: false,
        wrong_code: true,
      }
    )
  })
})
