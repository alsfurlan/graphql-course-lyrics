import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';

class SongDetail extends Component {
  render() {
    console.log(this.props);
    return <h3>SongDetail</h3>;
  }
}

export default graphql(fetchSong, {
  options: (props) => ({ variables: { id: props.params.id } }),
})(SongDetail);
