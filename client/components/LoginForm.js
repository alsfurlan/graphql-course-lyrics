import React, { Component } from 'react';
import loginMutation from '../mutations/login';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import userQuery from '../queries/user';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
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
    return (
      <form onSubmit={(event) => this.onSubmit(event)}>
        <h1>Login</h1>
        <input
          type='text'
          placeholder='User'
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <input
          className='input-field'
          type='password'
          placeholder='Password'
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <button className='btn' type='submit'>
          Submit
        </button>
      </form>
    );
  }
}

export default graphql(loginMutation)(LoginForm);
