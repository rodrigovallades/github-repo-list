import React, { Component } from 'react'

export class Filter extends Component {

  handleChange (event) {
    this.props.updateSearch(event.target.value);
  }

  render () {
    return (
      <input type="text" placeholder={this.props.placeholder} className="filter form-control" onChange={this.handleChange.bind(this)} value={this.props.searchText} />
    )
  }
}
