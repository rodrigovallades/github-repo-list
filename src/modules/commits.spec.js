import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import github from '../constants/github.constants';
import constants from '../constants/commits.constants';
import reducer, { getCommits, initialState } from './commits'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Commits action creators', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('dispatches the correct actions on successful fetch request', () => {
    fetch.mockResponse(JSON.stringify([ { name: 'commit1'} ]))

    const expectedActions = [
      { type: constants.COMMITS_REQUEST, params: {owner: 'testuser', repo: 'testrepo'}},
      { type: constants.COMMITS_SUCCESS, commits: [{name: 'commit1'}] }
    ]
    const store = mockStore(initialState)
    return (
      store
        .dispatch(getCommits({owner: 'testuser', repo: 'testrepo'}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    )
  })
})

describe('Commits reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it(`should handle ${constants.COMMITS_REQUEST}`, () => {
    expect(
      reducer({}, {
        type: constants.COMMITS_REQUEST,
        commits: [],
      })
    ).toEqual(
      {
        commits: [],
        loading: true,
      }
    )
  })
  it(`should handle ${constants.COMMITS_SUCCESS}`, () => {
    expect(
      reducer({}, {
        type: constants.COMMITS_SUCCESS,
        commits: [{ name: 'commit1'}],
      })
    ).toEqual(
      {
        commits: [{ name: 'commit1'}],
        loading: false,
      }
    )
  })
  it(`should handle ${constants.COMMITS_FAILURE}`, () => {
    expect(
      reducer({}, {
        type: constants.COMMITS_FAILURE
      })
    ).toEqual(
      {
        commits: [],
        loading: false,
      }
    )
  })
})
