import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Jumbotron, Alert } from 'react-bootstrap'
import Octicon from 'react-octicon'
import qs from 'query-string'

import { login } from '../../modules/login'
import { history } from '../../store';
import loginConstants from '../../constants/login.constants'
import Loader from '../../components/Loader'

import './login.css'

export class Login extends Component {
  componentWillMount() {
    const code = qs.parse(this.props.location.search).code
    if (code) this.props.login(code)

    const access_token = sessionStorage.getItem('access_token')
    if (access_token) history.push('/repos')
  }

  githubAuth() {
    window.location = `https://github.com/login/oauth/authorize?client_id=${loginConstants.GITHUB_CLIENTID}&scope=&redirect_uri=${window.location.origin}`;
  }

  render() {
    return (
      <div>
        {this.props.loading && (
          <Loader />
        )}
        <Grid>
          <Jumbotron className='text-center github-login'>
            <h1 className="app-title display-4">GitHub's repo list</h1>
            <h4>Tech stack</h4>
            <ul className="list-inline">
              <li className="list-inline-item"><Octicon name="heart"/> React 16</li>
              <li className="list-inline-item"><Octicon name="heart"/> Redux 5</li>
              <li className="list-inline-item"><Octicon name="heart"/> Router 4</li>
              <li className="list-inline-item"><Octicon name="heart"/> Bootstrap 4</li>
              <li className="list-inline-item"><Octicon name="heart"/> Webpack 4</li>
              <li className="list-inline-item"><Octicon name="heart"/> ES6</li>
              <li className="list-inline-item"><Octicon name="heart"/> SCSS</li>
            </ul>
            <h4>Techniques and good practices</h4>
            <ul className="list-inline">
              <li className="list-inline-item"><Octicon name="heart"/> BEM</li>
              <li className="list-inline-item"><Octicon name="heart"/> Custom responsive CSS (SCSS + Flexbox)</li>
              <li className="list-inline-item"><Octicon name="heart"/> Mobile-first</li>
            </ul>
            <hr className="my-4" />
            <p className="lead">This application requires OAuth style authentication with GitHub to display the authorized users' repos.</p>
            <button onClick={this.githubAuth} className='login-button btn btn-primary btn-lg'>Login with GitHub</button>
          </Jumbotron>
          {this.props.wrong_code && (
            <Alert bsStyle="danger">
              <Octicon name="alert"/> Invalid authentication code.
            </Alert>
          )}
          <Alert bsStyle="info">
            <Octicon name="info"/> Tip: Download the <strong><a href="https://github.com/zalmoxisus/redux-devtools-extension" target="_blnk">Redux DevTools</a></strong> to inspect the Redux store state.
          </Alert>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  access_token: state.auth.access_token,
  loading: state.auth.loading,
  wrong_code: state.auth.wrong_code,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  login
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
