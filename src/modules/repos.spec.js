import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import reposConstants from '../constants/repos.constants';
import { getRepos } from './repos'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const initialState = { repos: '', loading: true };

describe('Repos action creators', () => {
  it('dispatches the correct actions on successful fetch request', () => {
    fetch.mockResponse(JSON.stringify([{
      name: 'repo1'}
    ]))

    const expectedActions = [
      { type: reposConstants.REPOS_REQUEST, access_token: '1234'},
      { type: reposConstants.REPOS_SUCCESS, repos: [{name: 'repo1'}] }
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
