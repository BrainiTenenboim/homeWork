import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../Modal/Modal'
import './NewPost.css'

function NewPost(props) {
  const [title, setTitle] = useState(''); // State for the title input
  const [body, setBody] = useState(''); // State for the body input
  const [error, setError] = useState(''); // State for error messages
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility

  // Event handler for title input changes
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Event handler for body input changes
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate title
    if (!title) {
      setError('Please enter a title');
      setModalOpen(true);
      return;
    }

    // Validate body
    if (!body) {
      setError('Please enter a body');
      setModalOpen(true);
      return;
    }

    // Validate if the title or body contains numbers
    const hasNumbers = /\d/.test(title) || /\d/.test(body);
    if (hasNumbers) {
      setError('The title and body must contain only letters, no numbers');
      setModalOpen(true);
      return;
    }

    // All validations passed, add the post
    const newPost = { title: title, body: body, userId: props.currentUserId };

    props.setLoader(true); // Set the loader state to true to indicate loading

    // Send a POST request to add the new post
    axios
      .post('https://jsonplaceholder.typicode.com/posts', newPost)
      .then((response) => {
        props.addPost(newPost); // Call the addPost function with the new post data
        props.setLoader(false); // Set the loader state to false to indicate loading is complete
      })
      .catch((error) => {
        console.error('Error adding new post:', error); // Log any errors that occur during the request
        props.setLoader(false); // Set the loader state to false in case of an error
      });
  };

  // Event handler for closing the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className='titleDesign'>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} />
        </div>
        <div >
          <label htmlFor="body">Body:</label>
          <textarea id="body" value={body} onChange={handleBodyChange}></textarea>
        </div>
        {error && <p className="error">{error}</p>} {/* Display error message if there is an error */}
        <button type="submit">Submit</button>
      </form>
      {modalOpen && <Modal error={error} onClose={closeModal} />}
    </div>
  );
}

export default NewPost;