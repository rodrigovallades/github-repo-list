import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Login = props => (
  <div>
    <h1>Login</h1>
    <button onClick={() => props.viewList()}>Go to repo list page via redux</button>
  </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
  viewList: () => push('/list')
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Login);
