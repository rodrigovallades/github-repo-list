import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GitHubLogin from 'react-github-login';

import loginConstants from '../../constants/login.constants'

const onLoginSuccess = response => {
  let data = new FormData()
  data.append('code', response.code)

  fetch(`${loginConstants.GITHUB_MYGATEKEEPER}/authenticate/${response.code}`)
    .then(res => {
        res.json().then(res => {
          console.log(res.token);
          fetch(`https://api.github.com/user/repos?access_token=${res.token}`)
            .then(repos => {
                repos.json().then(repos => {
                  console.log(repos);
                })
            })
      });
    });
};
const onLoginFailure = response => console.error(response.token);

const Login = props => (
  <div>
    <GitHubLogin clientId={loginConstants.GITHUB_CLIENTID}
      redirectUri={window.location.origin}
      scope='user,repo'
      onSuccess={onLoginSuccess}
      onFailure={onLoginFailure}/>
  </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
  viewList: () => push('/list')
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Login);
