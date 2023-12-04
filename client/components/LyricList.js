import React, { Component } from 'react';

class LyricList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ul className='collection'>{this.renderLyrics()}</ul>;
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content }) => {
      return (
        <li key={id} className='collection-item'>
          {content}
        </li>
      );
    });
  }
}

export default LyricList;
