import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';

import { getRepos } from '../../modules/repos';
import { history } from '../../store';
import RepoCard from '../../components/RepoCard'

import './repos.css'

class Repos extends Component {
  componentWillMount() {
    const access_token = sessionStorage.getItem('access_token')

    if (access_token) {
      this.props.getRepos(access_token)
    } else {
      history.push('/');
    }
  }

  renderRepos() {
    const repos = this.props.repos ?  this.props.repos : [];

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
          watchers_count={repo.watchers_count} />
      )
    })
  }

  render() {
    return (
      <div>
        <Grid>
          <h1 className="display-4">Repos</h1>
          <div className='repos'>
            {this.renderRepos()}
          </div>
        </Grid>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  repos: state.repos.repos
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getRepos
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Repos);
