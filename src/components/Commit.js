import React from 'react'
import moment from 'moment'

import './Commit.css'

export default props => (
  <div key={props.index} className="list-group-item commits__commit">
    <p className="mb-1"><a href={props.html_url} target="_blank">{props.message}</a></p>
    <p className="mb-0 text-muted"><span className="card-avatar"><img src={props.avatar_url} alt={props.login} title={props.login} /></span> <strong>{props.login}</strong></p>
    <small>{moment(props.date).fromNow()}</small>
  </div>
)
