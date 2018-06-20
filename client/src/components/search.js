import React, { Component } from 'react';
import './search.css';
import axios from 'axios'


class Search extends Component {
  constructor(props) {
      super(props);
      this.state = { summonerName: "" };
  }

  sumSearch(summonerName) {
      console.log("Summoner name: ", summonerName);
      var url = "/api/search/" + summonerName
      axios.get(url).then(res => console.log(res.data));
  }

  render() {
    return (
      <div className="search col-6 offset-3 form-group">
        <input className="search-bar form-control form-control-lg" type="search" value={this.state.summonerName} onChange={event => this.onInputChange(event.target.value)} />
        <button className="btn btn-ghost" onClick={() => this.onClick(this.state.summonerName)}>Search</button>
      </div>
    );
  }

  onInputChange(summonerName) {
      this.setState({ summonerName });
  }

  onClick(summonerName) {
      // console.log(summonerName);
      this.props.onInputChange(summonerName);
  }

}

export default Search;
