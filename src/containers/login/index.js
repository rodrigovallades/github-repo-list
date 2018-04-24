import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GitHubLogin from 'react-github-login';

import { login } from '../../modules/login'
import loginConstants from '../../constants/login.constants'

class Login extends Component {
  constructor(props) {
    super(props);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
  }

  onLoginSuccess(res) {
    this.props.login(res.code);
  }

  onLoginFaiture(res) {
    console.log(res);
  }

  render() {
    return (
      <div>
        <GitHubLogin clientId={loginConstants.GITHUB_CLIENTID}
          redirectUri={window.location.origin}
          scope='user,repo'
          onSuccess={this.onLoginSuccess}
          onFailure={this.onLoginFailure}/>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  access_token: state.auth.access_token
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
