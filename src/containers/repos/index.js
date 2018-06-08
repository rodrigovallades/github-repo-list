import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Alert } from 'react-bootstrap'
import Octicon from 'react-octicon'

import { getRepos, setFilter } from '../../modules/repos'
import { history } from '../../store'
import RepoCard from '../../components/RepoCard'
import Loader from '../../components/Loader'
import { Filter } from '../../components/Filter'

import './repos.css'

export class Repos extends Component {

  componentWillMount() {
    const access_token = sessionStorage.getItem('access_token')

    if (access_token) {
      if (!this.props.repos.length) {
        this.props.getRepos(access_token)
      }
    } else {
      history.push('/');
    }
  }

  selectRepo(owner, repo) {
    history.push(`/${owner}/${repo}/commits`);
  }

  filter(repos) {
    const filter = this.props.filter || '';
    return repos.filter(repo => repo.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
  }

  renderRepos() {
    if (!this.props.repos.length) {
      return (
        <p>No repos found in this account.</p>
      )
    }

    return this.filter(this.props.repos).map((repo, index) => {
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
          <h1 className="title"><span className="badge badge-light">{this.filter(this.props.repos).length}</span> Repositories</h1>
          <Filter updateSearch={this.props.setFilter.bind(this.props.this)} searchText={this.props.filter} placeholder='Filter repository' />
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

Repos.defaultProps = {
  setFilter: function(){},
  repos: [],
  filter: ''
};

const mapStateToProps = state => ({
  repos: state.repos.repos,
  loading: state.repos.loading,
  filter: state.repos.filter
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getRepos,
  setFilter
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Repos);
