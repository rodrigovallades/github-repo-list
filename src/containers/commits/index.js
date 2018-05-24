import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'react-bootstrap'
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

    if (access_token) {
      this.props.getCommits(access_token)
    } else {
      history.push('/');
    }
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
      return (
        <Commit
          key={index}
          date={commit.commit.author.date}
          avatar_url={commit.author.avatar_url}
          login={commit.author.login}
          html_url={commit.html_url}
          message={commit.commit.message} />
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
