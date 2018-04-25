import React from 'react'
import Octicon from 'react-octicon'

import './RepoCard.css'

export default props => (
  <div key={props.index} className="card repos__repo">
    <div className="card-body">
      <h5 className="card-title"><a href={props.html_url} target="_blank">{props.name}</a></h5>
      <p className="card-text">{props.description}</p>
    </div>
    <div className="card-footer">
      <div className="card-avatar"><img src={props.avatar_url} alt="Owner avatar" title={props.login} /></div>
      <div className="card-github-icons">
        <div className="card-github-icon" title="Stars">
          {props.stargazers_count} <Octicon name="star"/>
        </div>
        <div className="card-github-icon" title="Forks">
          {props.forks_count} <Octicon name="repo-forked"/>
        </div>
        <div className="card-github-icon" title="Watchers">
          {props.watchers_count} <Octicon name="eye"/>
        </div>
      </div>
    </div>
  </div>
)
