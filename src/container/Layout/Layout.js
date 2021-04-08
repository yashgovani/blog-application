import classes from './Layout.module.css';
import React from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../component/navigation/Toolbar/Toolbar';
//import Aux from '../../hoc/Auxiliary/Auxiliary';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Toolbar isAuth={this.props.isAuthenicated} />
        <main className={classes.Content}>{this.props.children}</main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenicated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
