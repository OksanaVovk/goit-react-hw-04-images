import { useState } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ imgForModal, onClose }) {
  useState(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
  });

  const handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className="overlay" onClick={handleBackdrop}>
      <div className="modal">
        <img src={imgForModal} alt="" className="img_modal" />
      </div>
    </div>,
    modalRoot
  );
}
