import React, { Component } from 'react';
import fetchSongQuery from '../queries/fetchSong';
import SongForm from './SongForm';
import updateSongMutation from '../mutations/updateSong';
import fetchSongs from '../queries/fetchSongs';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

class SongEdit extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit(title) {
    this.props
      .mutate({
        variables: { id: this.props.params.id, title },
        refetchQueries: [{ query: fetchSongs }],
      })
      .then(() => {
        hashHistory.push('/');
      });
  }

  render() {
    const { loading, song } = this.props.data;
    if (loading) return <div>Loading...</div>;
    return (
      <SongForm
        header='Edit the song'
        title={song.title}
        onSubmit={this.onSubmit.bind(this)}
      ></SongForm>
    );
  }
}

export default graphql(updateSongMutation)(
  graphql(fetchSongQuery, {
    options: (props) => ({ variables: { id: props.params.id } }),
  })(SongEdit)
);
