import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';
import mutation from '../mutations/addSong';
import SongForm from './SongForm';

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  onSubmit(title) {
    this.props
      .mutate({
        variables: { title },
        refetchQueries: [{ query }],
      })
      .then(() => {
        hashHistory.push('/');
      });
  }

  render() {
    return (
      <SongForm
        header='Create a New Song'
        onSubmit={this.onSubmit.bind(this)}
      ></SongForm>
    );
  }
}

export default graphql(mutation)(SongCreate);
