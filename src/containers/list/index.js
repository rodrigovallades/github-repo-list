import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';
import Octicon from 'react-octicon'

import { getRepos } from '../../modules/list';
import { history } from '../../store';

import './list.css'

class List extends Component {
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
        <div key={index} className="card repos__repo">
          <div className="card-body">
            <h5 className="card-title"><a href={repo.html_url} target="_blank">{repo.name}</a></h5>
            <p className="card-text">{repo.description}</p>
          </div>
          <div className="card-footer">
            <div className="card-avatar"><img src={repo.owner.avatar_url} alt="Owner avatar" title={repo.owner.login} /></div>
            <div className="card-github-icons">
              <div className="card-github-icon" title="Stars">
                {repo.stargazers_count} <Octicon name="star"/>
              </div>
              <div className="card-github-icon" title="Forks">
                {repo.forks_count} <Octicon name="repo-forked"/>
              </div>
              <div className="card-github-icon" title="Watchers">
                {repo.watchers_count} <Octicon name="eye"/>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <Grid>
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
)(List);
