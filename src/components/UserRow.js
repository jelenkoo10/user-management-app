import React, { Component } from "react";

export default class UserRow extends Component {
  state = {
    isEditing: false,
    newUserData: { ...this.props.user },
  };

  toggleEdit = () => {
    this.setState((prevState) => {
      return { ...prevState, isEditing: !prevState.isEditing };
    });
  };

  handleChange = (e, field) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      newUserData: {
        ...prevState.newUserData,
        [field]: value,
      },
    }));
  };

  handleNestedChange = (e, parentField, childField) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      newUserData: {
        ...prevState.newUserData,
        [parentField]: {
          ...prevState.newUserData[parentField],
          [childField]: value,
        },
      },
    }));
  };

  saveEdit = () => {
    this.props.handleEdit(this.props.user.id, this.state.newUserData);
    this.toggleEdit();
  };

  render() {
    // Destructuring state and props
    const { user, handleDelete, handleClick } = this.props;
    const { newUserData, isEditing } = this.state;

    return (
      // Opening user modal on row click
      // For every row, we check if editing is in progress, and display either input or piece of data
      <tr
        className="odd:bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
        onClick={!isEditing ? () => handleClick(user.id) : null}
      >
        <td className="border p-2">
          {isEditing ? (
            <input
              type="text"
              className="p-2 border border-black rounded-md w-fit"
              value={newUserData.name}
              onChange={(e) => this.handleChange(e, "name")}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          ) : (
            user.name
          )}
        </td>
        <td className="border p-2">
          {isEditing ? (
            <input
              type="text"
              className="p-2 border border-black rounded-md"
              value={newUserData.username}
              onChange={(e) => this.handleChange(e, "username")}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          ) : (
            user.username
          )}
        </td>
        <td className="border p-2">
          {isEditing ? (
            <input
              type="text"
              className="p-2 border border-black rounded-md"
              value={newUserData.email}
              onChange={(e) => this.handleChange(e, "email")}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          ) : (
            user.email
          )}
        </td>
        <td className="border p-2">
          {isEditing ? (
            <input
              type="text"
              className="p-2 border border-black rounded-md"
              value={newUserData.phone}
              onChange={(e) => this.handleChange(e, "phone")}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          ) : (
            user.phone
          )}
        </td>
        <td className="border p-2">
          {isEditing ? (
            <input
              type="text"
              className="p-2 border border-black rounded-md"
              value={newUserData.address.city}
              onChange={(e) => this.handleNestedChange(e, "address", "city")}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          ) : (
            user.address.city
          )}
        </td>
        <td className="border p-2">
          {isEditing ? (
            <input
              type="text"
              className="p-2 border border-black rounded-md"
              value={newUserData.address.street}
              onChange={(e) => this.handleNestedChange(e, "address", "street")}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          ) : (
            user.address.street
          )}
        </td>
        <td className="border p-2">
          {isEditing ? (
            <input
              type="text"
              className="p-2 border border-black rounded-md"
              value={newUserData.website}
              onChange={(e) => this.handleChange(e, "website")}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          ) : (
            user.website
          )}
        </td>
        <td className="border p-2">
          {isEditing ? (
            <input
              type="text"
              className="p-2 border border-black rounded-md"
              value={newUserData.company.name}
              onChange={(e) => this.handleNestedChange(e, "company", "name")}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          ) : (
            user.company.name
          )}
        </td>
        <td className="border p-2 flex gap-2">
          {isEditing ? (
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
              onClick={(e) => {
                e.stopPropagation();
                this.saveEdit();
              }}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
              onClick={(e) => {
                e.stopPropagation();
                this.toggleEdit();
              }}
            >
              Edit
            </button>
          )}
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(user.id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
