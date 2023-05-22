import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, StyledModal, StyledImg } from './ModalStyled';

const modalRoot = document.querySelector('#modal');

const Modal = ({ modalData, onModalClose }) => {
  const handleCloseModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      onModalClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onModalClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);

  const { largeImageURL, tags } = modalData;

  return createPortal(
    <Overlay onClick={handleCloseModal}>
      <StyledModal>
        <StyledImg src={largeImageURL} alt={tags} />
      </StyledModal>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  modalData: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onModalClose: PropTypes.func.isRequired,
};

export default Modal;
