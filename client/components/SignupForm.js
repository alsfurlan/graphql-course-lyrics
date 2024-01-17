import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import signupMutation from '../mutations/signup';
import userQuery from '../queries/user';
import AuthForm from './AuthForm';
import { hashHistory } from 'react-router';

class SignupForm extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.data.user === null && nextProps.data.user) {
      hashHistory.push('/');
    }
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query: userQuery }],
      })
      .then(() => {
        hashHistory.push('/');
      });
  }

  render() {
    return <AuthForm title="Signup" onSubmit={this.onSubmit.bind(this)} />;
  }
}

export default graphql(signupMutation)(SignupForm);
