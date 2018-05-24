import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Alert } from 'react-bootstrap'
import Octicon from 'react-octicon'

import { getCommits } from '../../modules/commits'
import { history } from '../../store'
import Commit from '../../components/Commit'
import Loader from '../../components/Loader'

import './commits.css'

export class Commits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commits: []
    };
  }

  componentWillMount() {
    const access_token = sessionStorage.getItem('access_token')

    if (!access_token) history.push('/')
  }

  componentDidMount() {
    const { match: { params } } = this.props
    this.props.getCommits(params)
  }

  componentWillReceiveProps(props){
    this.setState({ commits: props.commits })
  }


  renderCommits() {
    const commits = this.props.commits ? this.props.commits : [];
    if (!commits.length) {
      return (
        <p>No commits found in this repository.</p>
      )
    }
    return commits.map((commit, index) => {

      const date = commit.commit.author.date === null ? '' : commit.commit.author.date,
            avatar_url = commit.author === null || commit.author.avatar_url === null ? '' : commit.author.avatar_url,
            login = commit.commit.author.login === null ? '' : commit.commit.author.login,
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
          <h1 className="display-4"><span className="float-right"><small><a href="/repos">&lt; repos</a></small></span> Commits <span className="badge badge-light">{this.state.commits.length}</span></h1>
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
