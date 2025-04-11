import React, { Component } from "react";

// Filter component contains search input to filter user data by name or email, and also checkbox for enabling case-sensitive search
// Both cases are handled by handleSearch method from props, called in handleChange method with appropriate values
export default class Filter extends Component {
  state = {
    caseSensitive: false,
  };

  handleChange = (e) => {
    this.props.handleSearch(e.target.value, this.state.caseSensitive);
  };

  // Toggling the checkbox for case-sensitive search
  handleCheckbox = (e) => {
    this.setState((prevState) => ({ caseSensitive: !prevState.caseSensitive }));
  };

  render() {
    // Search filter and checkbox for case-sensitive searching
    return (
      <div className="flex flex-wrap items-center gap-10 bg-white p-4 shadow-md">
        <div className="flex flex-col">
          <label htmlFor="searchInput">Search users:</label>
          <input
            type="text"
            id="searchInput"
            onChange={this.handleChange}
            className="border p-2 rounded-md focus:ring focus:ring-blue-300"
          />
          <p className="text-sm italic">
            You can search users by name or email.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="caseSensitive"
            className="text-gray-700 font-semibold"
          >
            Case sensitive search:
          </label>
          <input
            type="checkbox"
            id="caseSensitive"
            value={this.state.caseSensitive}
            onChange={this.handleCheckbox}
            className="mr-2"
          />
        </div>
      </div>
    );
  }
}
