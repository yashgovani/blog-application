import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/action/index';
import Spinner from '../../component/Spinner/Spinner';
import Post from '../../component/Post/Post';
//import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class AllPosts extends React.Component {
  componentDidMount() {
    this.props.onFetchAllPosts();
  }

  postSelectedHandler = (id) => {
    this.props.history.push('/allpost/' + id );
  };

  render() {
    let posts = <Spinner />;
    if (!this.props.loading) {
      posts = this.props.posts.map((post) => (
        <Post
          key={post.id}
          title={post.postData.title}
          blogType={post.postData.blogType}
          authorName={post.postData.authorName}
          onPostSelect={() => this.postSelectedHandler(post.id)}
        />
      ));
    }
    return (
      <div>
        <section>{posts}</section>
         <Route
          path={this.props.match.url + '/:id'}
          exact
          component={FullPost}
        /> 
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.newPost.posts,
    loading: state.newPost.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAllPosts: () => dispatch(actions.fetchAllPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);
