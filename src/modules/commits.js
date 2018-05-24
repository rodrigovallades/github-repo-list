import github from '../constants/github.constants';
import constants from '../constants/commits.constants';

export const initialState = { commits: [], loading: true };

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case constants.COMMITS_SUCCESS:
      return {
        ...state,
        loading: false,
        commits: action.commits
      };
    case constants.COMMITS_FAILURE:
      return {
        ...state,
        loading: false,
        commits: ''
      };
    default:
      return state
  }
};

// action creators
export const getCommits = params => {
  return dispatch => {
    function request(params) { return { type: constants.COMMITS_REQUEST, params } };
    function success(commits) { return { type: constants.COMMITS_SUCCESS, commits } };
    function failure(error) { return { type: constants.COMMITS_FAILURE, error } };

    dispatch(request(params));

    return fetch(`${github.API_URL}/repos/${params.owner}/${params.repo}/commits?per_page=${github.LIMIT}`)
      .then(commits => {
        commits.json().then(commits => {
          dispatch(success(commits));
        })
      })
      .catch(function(error) {
        console.error(error)
        dispatch(failure(error));
      });
  }
};
