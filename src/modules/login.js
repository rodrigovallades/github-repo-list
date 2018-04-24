import loginConstants from '../constants/login.constants';

const initialState = { access_token: '' };

// action creators
export default (state = initialState, action) => {
  switch (action.type) {
    case loginConstants.LOGIN_SUCCESS:
      return {
        ...state,
        access_token: action.token
      };
    case loginConstants.LOGIN_FAILURE:
      return {
        ...state,
        access_token: ''
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
            console.log(res.token);
            dispatch(success(res.token));
        });
      })
      .catch(function(error) {
        console.log(error)
        dispatch(failure(error));
      });

    function request(code) { return { type: loginConstants.LOGIN_REQUEST, code } }
    function success(token) { return { type: loginConstants.LOGIN_SUCCESS, token } }
    function failure(error) { return { type: loginConstants.LOGIN_FAILURE, error } }
  }
};
