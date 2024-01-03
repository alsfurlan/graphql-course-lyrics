import React, { Component } from 'react';
import { Link } from 'react-router';

class SongForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: this.props.title };
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.title);
  }

  render() {
    return (
      <div>
        <Link to='/'>Back</Link>
        <h3>{this.props.header}</h3>
        <form onSubmit={(event) => this.onSubmit(event)}>
          <label>Song Title: </label>
          <input
            onChange={(event) => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

export default SongForm;
