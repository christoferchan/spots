import React, { Component } from "react";
import { connect } from "react-redux";
import { startSearch } from "../store/actions/search";
import SearchItem from "./SearchItem";

class Search extends Component {
  state = {
    text: ""
  };

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };
  render() {
    console.log(this.props.searchResults);
    const items =
      this.props.searchResults &&
      this.props.searchResults.map(searchItem => (
        <SearchItem info={searchItem} />
      ));
    return (
      <div className="search">
        <div>
          <input
            type="text"
            placeholder="Search for places to add.."
            className="input"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <div className="btn-search_container">
            <div
              className="btn-search"
              onClick={() => this.props.search(this.state.text)}
            >
              Search
            </div>
          </div>
          <div className="search_item_list">{items}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchResults: state.search
  };
};

const mapDispatchToProps = dispatch => {
  return {
    search: text => dispatch(startSearch(text))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
