import React, { Component } from "react";
import UserTable from "./components/UserTable";
import Filter from "./components/Filter";
import { RotatingLines } from "react-loader-spinner";

export default class App extends Component {
  // There are two user arrays: one to store original values, and other one for filtered values
  state = {
    isLoading: true,
    users: [],
    filteredUsers: [],
    searchQuery: "",
  };

  // Fetching user data and handling loading state
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) =>
        this.setState((prevState) => {
          return {
            ...prevState,
            users: data,
            filteredUsers: data,
            isLoading: false,
          };
        })
      )
      .catch((error) => {
        console.error("Error fetching users:", error);
        this.setState((prevState) => {
          return { ...prevState, isLoading: false };
        });
      });
  }

  // With one method, two cases are handled, depending on the caseSensitive checkbox: case sensitive and non-case sensitive search
  handleSearch = (queryString, caseSensitive) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        searchQuery: queryString,
        filteredUsers: prevState.users.filter((user) => {
          if (caseSensitive) {
            return (
              user.name.includes(queryString) ||
              user.email.includes(queryString)
            );
          }
          return (
            user.name.toLowerCase().includes(queryString.toLowerCase()) ||
            user.email.toLowerCase().includes(queryString.toLowerCase())
          );
        }),
      };
    });
  };

  handleSorting = (e) => {
    const attribute = e.target.value;

    this.setState((prevState) => {
      let updatedUsers = prevState.filteredUsers;

      // Handling default (empty) value
      if (attribute === "") {
        // Reset sorting but keep the search filter
        updatedUsers = prevState.users.filter((user) => {
          return (
            user.name
              .toLowerCase()
              .includes(prevState.searchQuery.toLowerCase()) ||
            user.email
              .toLowerCase()
              .includes(prevState.searchQuery.toLowerCase())
          );
        });
      } else {
        updatedUsers = [...updatedUsers].sort((a, b) => {
          let firstValue;
          let secondValue;

          // Handling nested attributes, such as "city" (inside "address")
          if (attribute === "city") {
            firstValue = a.address.city.toLowerCase();
            secondValue = b.address.city.toLowerCase();
          } else if (attribute === "street") {
            firstValue = a.address.street.toLowerCase();
            secondValue = b.address.street.toLowerCase();
          } else if (attribute === "company") {
            firstValue = a.company.name.toLowerCase();
            secondValue = b.company.name.toLowerCase();
          } else {
            // If attribute is not nested, we can directly access it by using the bracket notation
            firstValue = a[attribute].toLowerCase();
            secondValue = b[attribute].toLowerCase();
          }

          return firstValue.localeCompare(secondValue);
        });
      }

      return { ...prevState, filteredUsers: updatedUsers };
    });
  };

  // Handling editing of a user by keeping track of its ID and updated data
  handleEdit = (userId, updatedUser) => {
    this.setState((prevState) => ({
      ...prevState,
      users: prevState.users.map((user) =>
        user.id === userId ? updatedUser : user
      ),
      filteredUsers: prevState.filteredUsers.map((user) =>
        user.id === userId ? updatedUser : user
      ),
    }));
  };

  // Handling deleting of a user by finding user with specific ID and removing it from arrays
  handleDelete = (id) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        users: prevState.users.filter((user) => user.id !== id),
        filteredUsers: prevState.filteredUsers.filter((user) => user.id !== id),
      };
    });
  };

  render() {
    return (
      <main className="container mx-auto px-4 py-6 bg-gray-100 min-h-screen">
        {
          // Showing loading spinner when the data is still loading
          this.state.isLoading ? (
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <>
              <Filter handleSearch={this.handleSearch} />
              <UserTable
                users={this.state.filteredUsers}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
                handleSorting={this.handleSorting}
              />
            </>
          )
        }
      </main>
    );
  }
}
