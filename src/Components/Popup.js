import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function Popup(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ooops!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Under Construction</h4>
          <p>
            Please bear with is, we are still constructing this part.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default Popup
