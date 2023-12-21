import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewPost from '../NewPost/NewPost';
import Modal from '../Modal/Modal';
import './UserPosts.css';

function UserPosts(props) {
  const [posts, setPosts] = useState([]);
  const [showNewPost, setShowNewPost] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    props.setLoader(true);

    // Fetch posts from the API
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setPosts(response.data);
        props.setLoader(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        props.setLoader(false);
      });
  }, []);

  // Function to add a new post
  const addPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="user-posts">

      <h2>User Posts</h2>
      <ul>
        {posts
          .filter((post) => post.userId === props.currentUserId)
          .map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
      </ul>

      <button className="add-post-button" onClick={() => setShowNewPost(true)}>
        Add New Post
      </button>


      {showNewPost && (
        <NewPost
          setLoader={props.setLoader}
          addPost={addPost}
          currentUserId={props.currentUserId}
          setModalOpen={setModalOpen}
        />
      )}

      {modalOpen && (
        <Modal
          error="Please fill in all fields"
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default UserPosts;