import React from 'react'

import './Commit.css'

export default props => (
  <div key={props.index} className="list-group-item commits__commit">
    <p className="mb-1"><span className="card-avatar"><img src={props.avatar_url} alt={props.login} title={props.login} /></span> <a href={props.html_url} target="_blank">{props.message}</a></p>
    <small>{props.date}</small>
  </div>
)
