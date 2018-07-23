import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      image: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      title: this.state.title,
      image: this.state.image,
      text: this.state.text,
      name: user.name,
      profilepic: user.profilepic
    };

    this.props.addPost(newPost);
    this.setState({ title: '', image: '', text: ''});
    this.props.history.push('/feed');
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
        <div className="post-form container">
          <div className="row">
            <div className="col">
              <div className="card-header text-white text-center">Submit to  your Gallery</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <TextAreaFieldGroup
                      type="text"
                      name="title"
                      placeholder="Give your post a title"
                      value={this.state.title}
                      onChange={this.onChange}
                      error={errors.title} 
                    />
                    <span className="local-wrapper">
                      <span className="local-upload-txt"><em>Click <a href="#"> here </a> 
                      to upload from your computer.</em>
                      </span>
                    </span>
                    <TextAreaFieldGroup
                      type="text"
                      name="image"
                      placeholder="Place image URL here"
                      value={this.state.image}
                      onChange={this.onChange}
                      error={errors.image} 
                    />
                    <TextAreaFieldGroup
                      placeholder="Write a description"
                      name="text"
                      value={this.state.text}
                      onChange={this.onChange}
                      error={errors.text}
                      id="desc-txt"
                    />
                  </div>
                  <button type="submit" className="post-form-button btn btn-dark">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
