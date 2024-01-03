import React, { Component } from 'react';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import likeLyricMutation from '../mutations/likeLyric';
import deleteLyricMutation from '../mutations/deleteLyric';
import fetchSong from '../queries/fetchSong';

class LyricList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ul className='collection'>{this.renderLyrics()}</ul>;
  }

  onLike(id, likes) {
    this.props.likeLyricMutation({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          __typename: 'LyricType',
          id,
          likes: ++likes,
        },
      },
    });
  }

  remove(id) {
    this.props.deleteLyricMutation({
      variables: { id },
      refetchQueries: [
        {
          query: fetchSong,
          variables: { id: this.props.songId },
        },
      ],
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className='collection-item'>
          {content}
          <div className='vote-box'>
            <i
              className='material-icons'
              onClick={() => this.onLike(id, likes)}
            >
              thumb_up
            </i>
            <div className='likes'>{likes}</div>
            <i className='material-icons' onClick={() => this.remove(id)}>
              delete_forever
            </i>
          </div>
        </li>
      );
    });
  }
}

export default compose(
  graphql(likeLyricMutation, { name: 'likeLyricMutation' }),
  graphql(deleteLyricMutation, { name: 'deleteLyricMutation' })
)(LyricList);
