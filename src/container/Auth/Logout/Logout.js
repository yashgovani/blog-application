import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from '../../../store/action/index';

class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchProps)(Logout);
