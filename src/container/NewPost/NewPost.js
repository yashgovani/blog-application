import React from 'react';
import Input from '../../component/Input/Input';
import Button from '../../component/Button/Button';
import * as actions from '../../store/action/index';
import { connect } from 'react-redux';
//import axios from '../../axios-post';
//import { updateObject } from '../../utility';

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postBlog: {
        blogType: {
          label: 'Select Type of Blog',
          elementType: 'select',
          elementConfig: {
            options: [
              { value: 'Scientific', displayValue: 'Scientific' },
              { value: 'Commercial', displayValue: 'Commercial' },
              { value: 'Arts', displayValue: 'Arts' },
              { value: 'History', displayValue: 'History' },
              { value: 'Current Affairs', displayValue: 'Current Affairs' },
            ],
          },
          value: 'Scientific',
          validation: {},
          valid: true,
        },
        title: {
          label: 'Title',
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Title of your Blog',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        authorName: {
          label: 'Author Name',
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Author Name',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        blog: {
          label: 'Blog',
          elementType: 'textarea',
          elementConfig: {
            type: 'text',
            placeholder: 'Enter Your Full Blog Here',
          },
          value: '',
          validation: {
            required: true,
            minLength: 500,
          },
          valid: false,
          touched: false,
        },
      },
      formIsValid: false,
    };
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isPassword) {
      const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  postHandler = (e) => {
    e.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.postBlog) {
      formData[formElementIdentifier] = this.state.postBlog[
        formElementIdentifier
      ].value;
    }
    const post = {
      postData: formData,
      userId: this.props.userId,
      email: this.props.email,
    };
    this.props.onUploadPost(post, this.props.token);
  };



  inputChangeHandler = (event, controlName) => {
    const updatedPost = {
      ...this.state.postBlog,
      [controlName]: {
        ...this.state.postBlog[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.postBlog[controlName].validation
        ),
        touched: true,
      },
    };
    let formIsValid = true;
    for (let controlName in updatedPost) {
      formIsValid = updatedPost[controlName].valid && formIsValid;
    }
    this.setState({ postBlog: updatedPost, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.postBlog) {
      formElementsArray.push({
        id: key,
        config: this.state.postBlog[key],
      });
    }
    let form = (
      <form onSubmit={this.postHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            label={formElement.config.label}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          SUBMIT
        </Button>
      </form>
    );
    return (
      <div>
        <h3 style={{ textAlign: 'center' }}>Write Your Blog Here</h3>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    email: state.auth.email,
    loading: state.newPost.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUploadPost: (postData, token) =>
      dispatch(actions.postUpload(postData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
