import React, { Component } from 'react';
import gpl from 'graphql-tag';

export default class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  onSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={(event) => this.setState({ content: event.target.value })}
        />
      </form>
    );
  }
}

const mutation = gpl`
mutation AddLyricToSong(
  $content: String,
  $songId: ID
) {
  addLyricToSong(content: $content, songId: $songId){
  	id
    lyrics {
      id,
      content
    }
  }
}
.;`;
