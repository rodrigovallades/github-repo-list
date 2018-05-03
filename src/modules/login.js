import constants from '../constants/login.constants';
import { history } from '../store'

export const initialState = { access_token: '', loading: false };

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case constants.LOGIN_SUCCESS:      
      return {
        ...state,
        access_token: action.token,
        loading: false
      };
    case constants.LOGIN_FAILURE:
      return {
        ...state,
        access_token: '',
        loading: false
      };
    default:
      return state
  }
};

// action creators
export const login = code => {
  return dispatch => {
    function request(code) { return { type: constants.LOGIN_REQUEST, code } };
    function success(token) { return { type: constants.LOGIN_SUCCESS, token } };
    function failure(error) { return { type: constants.LOGIN_FAILURE, error } };

    dispatch(request({ code }));

    let data = new FormData()
    data.append('code', code)

    return fetch(`${constants.GITHUB_MYGATEKEEPER}/authenticate/${code}`)
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
  }
};
