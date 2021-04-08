import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import Auth from './container/Auth/Auth';
import NewPost from './container/NewPost/NewPost';
import Layout from './container/Layout/Layout';
import Logout from './container/Auth/Logout/Logout';
import Posts from './container/Posts/Posts';
import { connect } from 'react-redux';
import * as actions from './store/action/index';
import AllPosts from './container/AllPosts/AllPosts';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/allpost" exact component={AllPosts} />
        <Route path="/login" component={Auth} />
        <Redirect from="/" to="/allpost" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/allpost" exact component={AllPosts} />
          <Route path="/login" exact component={Auth} />
          <Route path="/newpost" component={NewPost} />
          <Route path="/logout" component={Logout} />
          <Route path="/post" component={Posts} />
          <Redirect from="/" to="/allpost" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
