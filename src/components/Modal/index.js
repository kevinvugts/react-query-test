import React from 'react'

// Bootstrap
import { Modal } from 'react-bootstrap'

const CustomModal = ({ showModal, onHide, body, id }) => (
  <Modal id={id} centered show={showModal} onHide={() => onHide()}>
    <Modal.Header
      style={{
        borderBottom: 'none',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <i onClick={onHide} className="fal fa-times" style={{ fontSize: 25 }}></i>
    </Modal.Header>

    <Modal.Body>{body}</Modal.Body>
  </Modal>
)

export default CustomModal
