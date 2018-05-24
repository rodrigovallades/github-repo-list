import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Alert } from 'react-bootstrap'
import Octicon from 'react-octicon'

import { getRepos } from '../../modules/repos'
import { history } from '../../store'
import RepoCard from '../../components/RepoCard'
import Loader from '../../components/Loader'

import './repos.css'

export class Repos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
  }

  componentWillMount() {
    const access_token = sessionStorage.getItem('access_token')

    if (access_token) {
      this.props.getRepos(access_token)
    } else {
      history.push('/');
    }
  }

  componentWillReceiveProps(props){
    this.setState({ repos: props.repos })
  }

  selectRepo(owner, repo) {
    history.push(`/${owner}/${repo}/commits`);
  }

  renderRepos() {
    const repos = this.props.repos ? this.props.repos : [];
    if (!repos.length) {
      return (
        <p>No repos found in this account.</p>
      )
    }
    return repos.map((repo, index) => {
      return (
        <RepoCard
          key={index}
          html_url={repo.html_url}
          name={repo.name}
          description={repo.description}
          avatar_url={repo.owner.avatar_url}
          login={repo.owner.login}
          stargazers_count={repo.stargazers_count}
          forks_count={repo.forks_count}
          watchers_count={repo.watchers_count}
          onClick={() => this.selectRepo(repo.owner.login, repo.name)}
        />
      )
    })
  }

  render() {
    return (
      <div>
        {this.props.loading && (
          <Loader />
        )}
        <Grid>
          <h1 className="display-4">Repos <span className="badge badge-light">{this.state.repos.length}</span></h1>
          <div className='repos'>
            {this.renderRepos()}
          </div>
          <Alert bsStyle="info">
            <Octicon name="info"/> Tip: Download the <strong><a href="https://github.com/zalmoxisus/redux-devtools-extension" target="_blnk">Redux DevTools</a></strong> to inspect the Redux store state.
          </Alert>
        </Grid>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  repos: state.repos.repos,
  loading: state.repos.loading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getRepos
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Repos);
