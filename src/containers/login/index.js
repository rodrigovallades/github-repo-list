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
    let code = ''

    if (this.props.location && this.props.location.search) {
      code = qs.parse(this.props.location.search).code
    }

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
            <h1 className="app-title display-4">React + Redux GitHub's Repo List</h1>
            <p className="lead">by Rodrigo Vallades</p>
            <p className="lead">This application uses OAuth style authentication with GitHub to display the authorized users' repos. User stays authenticated during current session via browser's Session Storage.</p>
            <button onClick={this.githubAuth} className='login-button btn btn-primary btn-lg'>Login with GitHub</button>
            <hr className="my-4" />
            <h4>Tech stack</h4>
            <ul className="list-inline">
              <li className="list-inline-item"><Octicon name="check"/> React 16</li>
              <li className="list-inline-item"><Octicon name="check"/> Redux 5</li>
              <li className="list-inline-item"><Octicon name="check"/> Router 4</li>
              <li className="list-inline-item"><Octicon name="check"/> Bootstrap 4</li>
              <li className="list-inline-item"><Octicon name="check"/> Webpack 4</li>
              <li className="list-inline-item"><Octicon name="check"/> ES6</li>
              <li className="list-inline-item"><Octicon name="check"/> SCSS</li>
            </ul>
            <h4>Techniques and good practices</h4>
            <ul className="list-inline">
              <li className="list-inline-item"><Octicon name="check"/> BEM</li>
              <li className="list-inline-item"><Octicon name="check"/> Custom responsive CSS (SCSS + Flexbox)</li>
              <li className="list-inline-item"><Octicon name="check"/> Mobile-first</li>
            </ul>
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
