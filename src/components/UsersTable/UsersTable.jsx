import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserPosts from '../UserPosts/UserPosts';
import Modal from '../Modal/Modal';
import './UsersTable.css';

function UsersTable(props) {
  // Define state variables using the useState hook
  const [users, setUsers] = useState([]); // State variable to store users
  const [currentUserId, setCurrentUserId] = useState(''); // State variable to track the currently selected user ID
  const [filter, setFilter] = useState(''); // State variable to store the filter value
  const [modalOpen, setModalOpen] = useState(false); // State variable to manage the visibility of modal

  // Use the useEffect hook to fetch users when the component mounts
  useEffect(() => {
    // Set the loader to true to indicate loading
    props.setLoader(true);

    // Fetch users from the API
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        // Set the fetched users in the state
        setUsers(response.data);

        // Set the loader to false to indicate the completion of loading
        props.setLoader(false);
      })
      .catch((error) => {
        // Handle error if the API request fails
        console.error('Error fetching users:', error);

        // Set the loader to false to indicate the completion of loading
        props.setLoader(false);
      });
  }, []);

  // Handler for updating the filter value
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filter users based on the filter value
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase())
  );

  // Handler for selecting a user
  const handleUserClick = (userId) => {
    setCurrentUserId(userId);
  };

  // Handler for closing the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {/* Input for filtering users */}
      <input
        type="text"
        placeholder="Filter by name or email"
        value={filter}
        onChange={handleFilterChange}
        className="filter-input"
      />
      {/* Table to display the filtered users */}
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              className={currentUserId === user.id ? 'selected' : ''}
            >
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render UserPosts component if a user is selected */}
      {currentUserId && (
        <UserPosts
          setLoader={props.setLoader}
          currentUserId={currentUserId}
          setModalOpen={setModalOpen}
        />
      )}
      {/* Render the modal if modalOpen state is true */}
      {modalOpen && (
        <Modal
          error="Please fill in all fields"
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default UsersTable;