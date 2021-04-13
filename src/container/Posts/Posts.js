import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/action/index';
import Spinner from '../../component/Spinner/Spinner';
import Post from '../../component/Post/Post';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
import axios from '../../axios-post';

class Posts extends React.Component {
  componentDidMount() {
    this.props.onFetchPosts(this.props.token, this.props.userId);
  }

  postSelectedHandler = (id) => {
    this.props.history.push('/post/' + id);
  };

  postDeleteHandler = (id) => {
    axios
      .delete(`/posts/${id}.json`)
      .then((response) => {
        this.props.posts.filter((pst) => pst.id !== id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*   postUpdateHandler = (id) => {
    this.props.history.push({ pathname: '/newpost/' + id });
  }; */

  render() {
    let posts = <Spinner />;
    if (!this.props.loading) {
      posts = this.props.posts.map((post) => {
        return (
          <Post
            key={post.id}
            title={post.postData.title}
            blogType={post.postData.blogType}
            authorName={post.postData.authorName}
            onPostSelect={() => this.postSelectedHandler(post.id)}
            isAuth={this.props.isAuthenicated}
            clicked={() => this.postDeleteHandler(post.id)}
          />
        );
      });
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
    token: state.auth.token,
    userId: state.auth.userId,
    isAuthenicated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPosts: (token, userId) =>
      dispatch(actions.fetchPosts(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
