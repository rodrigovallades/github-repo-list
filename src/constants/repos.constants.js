import github from './github.constants';

export default  {
  GITHUB_REPOS_API: `${github.API_URL}/user/repos`,
  REPOS_REQUEST: 'AUTHENTICATED_REPOS_REQUEST',
  REPOS_SUCCESS: 'AUTHENTICATED_REPOS_SUCCESS',
  REPOS_FAILURE: 'AUTHENTICATED_REPOS_FAILURE'
};
