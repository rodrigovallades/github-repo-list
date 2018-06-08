import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid, Alert } from 'react-bootstrap'
import Octicon from 'react-octicon'

import { getCommits } from '../../modules/commits'
import { history } from '../../store'
import Commit from '../../components/Commit'
import Loader from '../../components/Loader'
import { Filter } from '../../components/Filter'


import './commits.css'

export class Commits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repo: '',
      filter: ''
    };
  }

  componentWillMount() {
    const access_token = sessionStorage.getItem('access_token')
    if (!access_token) history.push('/')
  }

  componentDidMount() {
    const { params } = this.props.match
    this.setState({ repo: params.repo });
    this.props.getCommits(params)
  }

  updateSearch(inputValue) {
    this.setState({
      filter: inputValue
    });
  }

  filter(commits) {
    return commits.filter(commit => commit.commit.message.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0);
  }

  renderCommits() {
    if (!this.props.commits.length) {
      return (
        <p>No commits found in this repository.</p>
      )
    }
    return this.filter(this.props.commits).map((commit, index) => {
      const date = commit.commit.author.date === null ? '' : commit.commit.author.date,
            avatar_url = commit.author === null || commit.author.avatar_url === null ? '' : commit.author.avatar_url,
            login = commit.commit.author.name === null ? '' : commit.commit.author.name,
            html_url = commit.html_url === null ? '' : commit.html_url,
            message = commit.commit.message === null ? '' : commit.commit.message;

      return (
        <Commit
          key={index}
          date={date}
          avatar_url={avatar_url}
          login={login}
          html_url={html_url}
          message={message} />
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
          <h1 className="title"><span className="float-right"><small><Link to="/repos">&lt; repos</Link></small></span> <span className="badge badge-light">{this.filter(this.props.commits).length}</span> {this.state.repo} <small className="text-muted">commits</small></h1>
          <Filter updateSearch={this.updateSearch.bind(this)} searchText={this.state.filter} placeholder='Filter commits' />
          <div className='list-group commits'>
            {this.renderCommits()}
          </div>
          <Alert bsStyle="info">
            <Octicon name="info"/> Tip: Download the <strong><a href="https://github.com/zalmoxisus/redux-devtools-extension" target="_blnk">Redux DevTools</a></strong> to inspect the Redux store state.
          </Alert>
        </Grid>
      </div>
    )
  }
};

Commits.defaultProps = {
  getCommits: function(){},
  commits: [],
  match: {
    params: ''
  }
};

const mapStateToProps = state => ({
  commits: state.commits.commits,
  loading: state.commits.loading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCommits
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Commits);
