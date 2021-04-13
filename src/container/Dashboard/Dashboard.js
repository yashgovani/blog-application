import React from 'react';
import { connect } from 'react-redux';
import {Route} from 'react-router-dom'
import * as actions from '../../store/action/index';
//import Spinner from '../../component/Spinner/Spinner';
import axios from '../../axios-post';
import NewPost from '../NewPost/NewPost';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.onFetchAllPosts();
  }

  redirectHandler = () => {
    this.props.history.push('/newpost');
  };

  postDeleteHandler = (id) => {
    axios.delete(`/posts/${id}.json`).catch((err) => {
      console.log(err);
    });
  };

  postEditHandler = (id) => {
    this.props.history.push('/newpost/' + id);
  };

  render() {
    //let posts = <Spinner />;
    let posts = null;
    if (!this.props.loading) {
      posts = this.props.posts.map((post) => (
        <tr key={post.id}>
          <td>{post.postData.title}</td>
          <td>{post.postData.authorName}</td>
          <td>{post.postData.blogType}</td>
          <td>
            <button
              onClick={() => this.postEditHandler(post.id)}
              className="ui primary button"
            >
              Edit
            </button>
          </td>
          <td>
            <button
              onClick={() => this.postDeleteHandler(post.id)}
              className="ui secondary button"
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    }
    return (
      <React.Fragment>
        <div>
          <center>
            <button
              className="ui inverted primary button"
              onClick={this.redirectHandler}
            >
              ADD NEW BLOG
            </button>
          </center>
        </div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Title Of Blog</th>
              <th>Author Name</th>
              <th>Blog Category</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{posts}</tbody>
        </table>
        <Route
          path={this.props.match.url + '/:id'}
          exact
          component={NewPost}
        />
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
