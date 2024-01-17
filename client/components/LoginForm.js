import React, { Component } from 'react';
import loginMutation from '../mutations/login';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import userQuery from '../queries/user';
import AuthForm from './AuthForm';

class LoginForm extends Component {
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
    return <AuthForm onSubmit={(event) => this.onSubmit(event)} />;
  }
}

export default graphql(userQuery)(graphql(loginMutation)(LoginForm));
