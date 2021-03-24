import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import CardInput from './CardInput'

function Popup({ home }) {
    const [show, setShow] = React.useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
        <Button onClick={handleShow} style={{ marginLeft: "95%" }}>Edit</Button>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {home.Title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardInput home={home}/>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer> */}
      </Modal>
      </>
    );
  }

export default Popup