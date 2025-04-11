import React, { Component } from "react";
import UserRow from "./UserRow";
import UserDetails from "./UserDetails";

// UserTable component receives the data that is fetched in the app and uses it to make a table.
// It displays the data, and also has actions fpr editing and deleting users.
export default class UserTable extends Component {
  state = {
    isModalOpened: false,
    modalUser: {},
  };

  // Modal logic is handled inside the whole table component, not a single row
  handleModalOpen = (id) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isModalOpened: true,
        modalUser: this.props.users.find((user) => id === user.id),
      };
    });
  };

  handleModalClose = () => {
    this.setState({
      isModalOpened: false,
      modalUser: {},
    });
  };

  render() {
    // Setting overflow to enable scrolling through the table on lower screen
    // Sorting is also handled on a table level
    const { users, handleSorting, handleDelete, handleEdit } = this.props;

    return (
      <div className="overflow-x-auto bg-white shadow-md p-4">
        <div className="mb-4">
          <label htmlFor="sorting" className="text-gray-700 font-semibold">
            Sort by:
          </label>
          <select
            id="sorting"
            onChange={handleSorting}
            className="ml-2 border p-2 rounded-md focus:ring focus:ring-blue-300"
          >
            <option default value=""></option>
            <option value="name">Name</option>
            <option value="username">Username</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="city">City</option>
            <option value="street">Street</option>
            <option value="website">Website</option>
            <option value="company">Company</option>
          </select>
        </div>

        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">City</th>
              <th className="border p-2">Street</th>
              <th className="border p-2">Website</th>
              <th className="border p-2">Company</th>
              <th className="border p-2"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              // UserRow keeps track of deleting, editing and modal opening and closing for a single user
              <UserRow
                key={user.id}
                user={user}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleClick={this.handleModalOpen}
                handleModalClose={this.handleModalClose}
              />
            ))}
          </tbody>
        </table>
        {this.state.isModalOpened ? (
          // Modal is shown when isModalOpened is toggled (with handleClick function prop from UserRow)
          <UserDetails
            user={this.state.modalUser}
            handleModalClose={this.handleModalClose}
          />
        ) : null}
      </div>
    );
  }
}
