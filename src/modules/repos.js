import constants from '../constants/repos.constants';

export const initialState = { repos: '', loading: true };

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case constants.REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        repos: action.repos
      };
    case constants.REPOS_FAILURE:
      return {
        ...state,
        loading: false,
        repos: ''
      };
    default:
      return state
  }
};

// action creators
export const getRepos = access_token => {
  return dispatch => {
    function request(access_token) { return { type: constants.REPOS_REQUEST, access_token } };
    function success(repos) { return { type: constants.REPOS_SUCCESS, repos } };
    function failure(error) { return { type: constants.REPOS_FAILURE, error } };

    dispatch(request(access_token));

    return fetch(`${constants.GITHUB_REPOS_API}?access_token=${access_token}&sort=updated&type=owner`)
      .then(repos => {
        repos.json().then(repos => {
          console.log(repos);
          dispatch(success(repos));
        })
      })
      .catch(function(error) {
        console.error(error)
        dispatch(failure(error));
      });
  }
};
