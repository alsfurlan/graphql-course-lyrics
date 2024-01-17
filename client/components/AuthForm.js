import React, { Component } from 'react';

export default class AuthForm extends Component {
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

    this.props.onSubmit({ email, password });
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
