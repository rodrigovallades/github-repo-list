import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getRepos } from '../../modules/list'
import store, { history } from '../../store'

class List extends Component {
  constructor(props) {
    super(props);
  }

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
        <div key={index} className='repos__repo'>{repo.name}</div>
      )
    })
  }

  render() {
    return (
      <div>
        <div className='repos'>
          {this.renderRepos()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  repos: state.repos.repos
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getRepos
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
