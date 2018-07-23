import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost,  addLike, removeLike } from '../../actions/postActions';

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions} = this.props;
    console.log("this is PostItem.js log")
    console.log(this.props);


    return (
      <div className="single-post-container container-fluid">
        <div className="post-image-wrapper">
          <a data-toggle="modal" data-target=".bd-example-modal-lg" href="#">
            <img className="post-image" src={post.image} alt="" />
          </a>
        </div>
        <div className="post-details-container container">
          <h1 className="post-title">{post.title}</h1>
          <p className="post-user">Submitted by 
            <a href="profile.html">
              <img
                className="profile-pic"
                src={post.profilepic}
                alt="#"
              />
            </a>
          </p>
          <hr />
          <p className="post-text">{post.text}</p>
          <div className="post-button-container container-fluid">
              {showActions ? (
              <div className="row">
                  <span className="col-3">
                    <button
                      onClick={this.onLikeClick.bind(this, post._id)}
                      type="button"
                      className="btn btn-light mr-1"
                    >
                      <i
                        className={classnames('far fa-heart', {
                          'text-info': this.findUserLike(post.likes)
                        })}
                      />
                      <span className="badge badge-light">{post.likes.length}</span>
                      <span>LIKES</span>
                    </button>
                  </span>
                    {post.user === auth.user.id ? (
                      <span className="user-buttons col-9">
                        <button
                          onClick={this.onDeleteClick.bind(this, post._id)}
                          type="button"
                          className="btn btn-danger"
                        >
                          <i className="fas fa-times" />
                        </button>
                        <Link 
                          to={`/posts/${post._id}/edit`}
                        >
                        <span className="edit-button">Edit</span>
                        </Link>
                      </span>
                  ) : null}
                </div>
              ) : null}
            </div>
        </div>
        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <img src={post.image} alt="#" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
