import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;

    if(!song) {
      return <div>Loading...</div>;
    }

    return <h3>{song.title}</h3>;
  }
}

export default graphql(fetchSong, {
  options: (props) => ({ variables: { id: props.params.id } }),
})(SongDetail);
