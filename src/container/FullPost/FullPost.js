import React from 'react';
import axios from '../../axios-post';

class FullPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedPost: null,
      postId: '',
    };
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      axios
        .get(`/posts/${this.props.match.params.id}.json`)
        .then((response) => {
          this.setState({ loadedPost: response.data });
        });
    }
  }

  componentDidUpdate() {
    if (
      !this.state.postId ||
      this.state.postId !== this.props.match.params.id
    ) {
      axios
        .get(`/posts/${this.props.match.params.id}.json`)
        .then((response) => {
          this.setState({
            loadedPost: response.data,
            postId: this.props.match.params.id,
          });
        });
    }
  }

  render() {
    let post = <p>{this.props.match.params.id} hello</p>;
    if (this.props.match.params.id) {
      post = <p>Loading..</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div>
          <h1>{this.state.loadedPost.postData.title}</h1>
          <p>{this.state.loadedPost.postData.authorName}</p>
          <p>{this.state.loadedPost.postData.blog}</p>
          <p>{this.state.loadedPost.email}</p>
        </div>
      );
    }
    return post;
  }
}
export default FullPost;
