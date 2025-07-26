import React from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    document.body
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '500px',
    width: '100%',
    position: 'relative'
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer'
  }
};
