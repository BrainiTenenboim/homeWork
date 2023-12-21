import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ error, onClose, onRetry }) => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  const handleRetry = () => {
    setShowModal(false);
    onRetry();
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={handleClose}>&times;</span>
            <p>{error}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;