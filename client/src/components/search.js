import React, { Component } from 'react';
// import './search.css';

class Search extends Component {
  constructor(props) {
      super(props);
      this.state = { sumName: "" };
  }

  render() {
    return (
      <div className="search">
        <input type="search" value={this.state.sumName} onChange={event => this.onInputChange(event.target.value)} />
        <button onClick={() => this.onClick(this.state.sumName)}>Search</button>
      </div>
    );
  }

  onInputChange(sumName) {
      this.setState({ sumName });
  }

  onClick(sumName) {
      // console.log(sumName);
      this.props.onInputChange(sumName);
  }

}

export default Search;
