import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import github from '../constants/github.constants';
import constants from '../constants/repos.constants';
import reducer, { getRepos, initialState } from './repos'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Repos action creators', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('calls the correct Github endpoint', () => {
    expect(constants.GITHUB_REPOS_API).toEqual('https://api.github.com/user/repos')
  })

  it('dispatches the correct actions on successful fetch request', () => {
    fetch.mockResponse(JSON.stringify([ { name: 'repo1'} ]))

    const expectedActions = [
      { type: constants.REPOS_REQUEST, access_token: '1234'},
      { type: constants.REPOS_SUCCESS, repos: [{name: 'repo1'}] }
    ]
    const store = mockStore(initialState)
    return (
      store
        .dispatch(getRepos('1234'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    )
  })
})

describe('Repos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it(`should handle ${constants.REPOS_SUCCESS}`, () => {
    expect(
      reducer({}, {
        type: constants.REPOS_SUCCESS,
        repos: [{ name: 'repo1'}],
      })
    ).toEqual(
      {
        repos: [{ name: 'repo1'}],
        loading: false,
      }
    )
  })
  it(`should handle ${constants.REPOS_FAILURE}`, () => {
    expect(
      reducer({}, {
        type: constants.REPOS_FAILURE
      })
    ).toEqual(
      {
        repos: '',
        loading: false,
      }
    )
  })
})
