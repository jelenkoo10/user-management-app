import React, { Component } from "react";

export default class UserDetails extends Component {
  render() {
    const { user, handleModalClose } = this.props;

    // A modal with detailed display of a single user
    return (
      // Clicking anywhere outside of modal should close it
      // With e.stopPropagation() on modal click, we are preventing modal close on click inside the modal
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
        onClick={handleModalClose}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Username:</span> {user.username}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Website:</span>{" "}
            <a
              href={`https://${user.website}`}
              target="_blank"
              className="text-blue-500 underline"
            >
              {user.website}
            </a>
          </p>

          <h3 className="text-xl font-semibold mt-4">Address</h3>
          <p className="text-gray-600 mb-1">
            {user.address.suite}, {user.address.street}
          </p>
          <p className="text-gray-600 mb-1">
            {user.address.city}, {user.address.zipcode}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Geo:</span> {user.address.geo.lat},{" "}
            {user.address.geo.lng}
          </p>

          <h3 className="text-xl font-semibold mt-4">Company</h3>
          <p className="text-gray-600 mb-1 font-bold">{user.company.name}</p>
          <p className="text-gray-600">"{user.company.catchPhrase}"</p>
          <p className="text-gray-600 mb-2">{user.company.bs}</p>

          <button
            onClick={handleModalClose}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition w-full"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}
