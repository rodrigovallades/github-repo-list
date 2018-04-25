import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GitHubLogin from 'react-github-login';
import { Grid, Jumbotron } from 'react-bootstrap';
import Octicon from 'react-octicon'

import { login } from '../../modules/login'
import { history } from '../../store';
import loginConstants from '../../constants/login.constants'

import './login.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFaiture = this.onLoginFaiture.bind(this);
  }

  componentWillMount() {
    const access_token = sessionStorage.getItem('access_token')
    if (access_token) history.push('/list');
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
        <Grid>
          <Jumbotron className='text-center github-login'>
            <h1 className="display-4">GitHub's repo list</h1>
            <ul className="list-inline">
              <li className="list-inline-item"><Octicon name="heart"/> React 16</li>
              <li className="list-inline-item"><Octicon name="heart"/> React-Router 4</li>
              <li className="list-inline-item"><Octicon name="heart"/> Redux 5</li>
              <li className="list-inline-item"><Octicon name="heart"/> Bootstrap 4</li>
              <li className="list-inline-item"><Octicon name="heart"/> Webpack 4</li>
              <li className="list-inline-item"><Octicon name="heart"/> JavaScript ES6</li>
            </ul>
            <p className="lead">Only modern stuff.<br />:)</p>
            <hr className="my-4" />
            <p>This application requires OAuth style authentication with GitHub to display the authorized users' repos.</p>
            <GitHubLogin
              className='login_button btn btn-primary btn-lg'
              clientId={loginConstants.GITHUB_CLIENTID}
              redirectUri={window.location.origin}
              scope='user,repo'
              onSuccess={this.onLoginSuccess}
              onFailure={this.onLoginFailure}/>
          </Jumbotron>
        </Grid>
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
