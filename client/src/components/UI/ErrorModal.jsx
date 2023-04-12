// @src/components/Modal.jsx

import React from "react";
import styles from "./Modal.module.css";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({ setModalIsOpen, message }) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setModalIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>
              Error
            </h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setModalIsOpen(false)}>
            <CloseIcon style={{ marginBottom: "-3px", color: 'black' }} />
          </button>
          <div className={styles.modalContent}>
            {message}
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
        {/*       <button
                className={styles.deleteBtn}
                onClick={() => setModalIsOpen(false)}
              >
                Delete
              </button> */}
              <button
                className={styles.cancelBtn}
                onClick={() => setModalIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
