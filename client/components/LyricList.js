import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ul className='collection'>{this.renderLyrics()}</ul>;
  }

  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          __typename: 'LyricType',
          id,
          likes: ++likes,
        }
      }
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className='collection-item'>
          {content}
          <div className="vote-box">
            <i className='material-icons' onClick={() => this.onLike(id, likes)}>
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
