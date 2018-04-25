import reposConstants from '../constants/repos.constants';

const initialState = { repos: '' };

// action creators
export default (state = initialState, action) => {
  switch (action.type) {
    case reposConstants.REPOS_SUCCESS:
      return {
        ...state,
        repos: action.repos
      };
    case reposConstants.REPOS_FAILURE:
      return {
        ...state,
        repos: ''
      };
    default:
      return state
  }
};

// reducers
export const getRepos = access_token => {
  return dispatch => {
    dispatch(request({ access_token }));

    fetch(`${reposConstants.GITHUB_REPOS_API}?access_token=${access_token}&sort=updated&type=owner`)
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

    function request(access_token) { return { type: reposConstants.REPOS_REQUEST, access_token } };
    function success(repos) { return { type: reposConstants.REPOS_SUCCESS, repos } };
    function failure(error) { return { type: reposConstants.REPOS_FAILURE, error } };
  }
};
