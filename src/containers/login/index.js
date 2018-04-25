import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GitHubLogin from 'react-github-login';
import { Grid, Jumbotron, Alert } from 'react-bootstrap';
import Octicon from 'react-octicon'

import { login } from '../../modules/login'
import { history } from '../../store';
import loginConstants from '../../constants/login.constants'
import Loader from '../../components/Loader'

import './login.css'

export class Login extends Component {
  constructor(props) {
    super(props);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFaiture = this.onLoginFaiture.bind(this);
  }

  componentWillMount() {
    const access_token = sessionStorage.getItem('access_token')
    if (access_token) history.push('/repos');
  }

  onLoginSuccess(res) {
    this.props.login(res.code);
  }

  onLoginFaiture(res) {
    console.log(res);
  }

  renderLoader() {
    const loading = this.props.loading;
    if (loading) {
      return (
        <Loader />
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderLoader()}
        <Grid>
          <Jumbotron className='text-center github-login'>
            <h1 className="app-title display-4">GitHub's repo list</h1>
            <h4>Tech stack</h4>
            <ul className="list-inline">
              <li className="list-inline-item"><Octicon name="heart"/> React 16</li>
              <li className="list-inline-item"><Octicon name="heart"/> React-Router 4</li>
              <li className="list-inline-item"><Octicon name="heart"/> Redux 5</li>
              <li className="list-inline-item"><Octicon name="heart"/> Bootstrap 4</li>
              <li className="list-inline-item"><Octicon name="heart"/> Webpack 4</li>
              <li className="list-inline-item"><Octicon name="heart"/> JavaScript ES6</li>
            </ul>
            <h4>Techniques and good practices</h4>
            <ul className="list-inline">
              <li className="list-inline-item"><Octicon name="heart"/> BEM CSS naming</li>
              <li className="list-inline-item"><Octicon name="heart"/> Custom responsive CSS with Flexbox</li>
              <li className="list-inline-item"><Octicon name="heart"/> Mobile-first approach</li>
            </ul>
            <hr className="my-4" />
            <p className="lead">This application requires OAuth style authentication with GitHub to display the authorized users' repos.</p>
            <GitHubLogin
              className='login-button btn btn-primary btn-lg'
              clientId={loginConstants.GITHUB_CLIENTID}
              redirectUri={window.location.origin}
              scope='user,repo'
              onSuccess={this.onLoginSuccess}
              onFailure={this.onLoginFailure}/>
          </Jumbotron>
          <Alert bsStyle="info">
            <Octicon name="info"/> Tip: Download the <strong><a href="https://github.com/zalmoxisus/redux-devtools-extension" target="_blnk">Redux DevTools</a></strong> to inspect the Redux store state.
          </Alert>
        </Grid>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  access_token: state.auth.access_token,
  loading: state.auth.loading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
