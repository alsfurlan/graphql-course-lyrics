import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import userQuery from '../queries/user';
import logoutMutation from '../mutations/logout';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  logout() {
    this.props.mutate({}).then(() => this.props.data.refetch());
  }

  renderButtons() {
    const { user } = this.props.data;

    if (!user) {
      return (
        <div>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </div>
      );
    }
    return (
      <li onClick={() => this.logout()}>
        <Link>Logout</Link>
      </li>
    );
  }

  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <div className='left'>
            <Link to='/' className='brand-logo'>
              Home
            </Link>
          </div>
          <ul className='right'>{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

export default graphql(logoutMutation)(graphql(userQuery)(Header));
