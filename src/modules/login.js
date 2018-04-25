import loginConstants from '../constants/login.constants';
import { history } from '../store'

const initialState = { access_token: '', loading: false };

// action creators
export default (state = initialState, action) => {
  switch (action.type) {
    case loginConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case loginConstants.LOGIN_SUCCESS:
      return {
        ...state,
        access_token: action.token,
        loading: false
      };
    case loginConstants.LOGIN_FAILURE:
      return {
        ...state,
        access_token: '',
        loading: false
      };
    default:
      return state
  }
};

// reducers
export const login = code => {
  return dispatch => {
    dispatch(request({ code }));

    let data = new FormData()
    data.append('code', code)

    fetch(`${loginConstants.GITHUB_MYGATEKEEPER}/authenticate/${code}`)
      .then(res => {
          res.json().then(res => {
            dispatch(success(res.token));
            sessionStorage.setItem('access_token', res.token);
            history.push('/repos');
        });
      })
      .catch(function(error) {
        console.error(error)
        dispatch(failure(error));
      });

    function request(code) { return { type: loginConstants.LOGIN_REQUEST, code } };
    function success(token) { return { type: loginConstants.LOGIN_SUCCESS, token } };
    function failure(error) { return { type: loginConstants.LOGIN_FAILURE, error } };
  }
};
