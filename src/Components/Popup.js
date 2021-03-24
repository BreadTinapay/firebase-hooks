import React from 'react'
import firebase from '../firebase'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// import CardInput from './CardInput'
// import { useStateValue } from '../StateProvider'

function Popup({ home }) {

  const [Title, setTitle] = React.useState(home.Title)
  const [Description, setDescription] = React.useState(home.Description)
  const [subTitle, setSubTitle] = React.useState(home.subTitle)


  const onUpdate = () => {
      const db = firebase.firestore();
      db.collection('home')
      .doc(home.id)
      .update({...home,
           Title, 
           subTitle, 
           Description});
           handleClose()
  }

  const onDelete = () => {
      const db = firebase.firestore()
      db.collection('home').doc(home.id).delete();
      handleClose()
  }

    const [show, setShow] = React.useState()
    const handleClose = () => {
      setShow(false)
    }

    const handleShow = () => {
      setShow(true)
    }


    return (
        <>
        <Button onClick={handleShow} style={{ marginLeft: "95%" }}>Edit</Button>

      <Modal
        size="mg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        style={{ backgroundColor: "rgba(0,0,0,0.5)", background: "transparent" }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {home.Title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group controlId="formBasicText">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={Title} onChange={(e) => setTitle(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicText">
                <Form.Label>Sub-Title</Form.Label>
                <Form.Control type="text" value={subTitle} onChange={(e) => setSubTitle (e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicText">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={5} type="text" value={Description} onChange={(e) => setDescription(e.target.value)}/>
            </Form.Group>
        </Form>
          {/* <CardInput home={home}/> */}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={onUpdate} style={{ marginRight: "10px" }}>
                Update
            </Button>

            <Button variant="primary" onClick={onDelete}>
                Delete
            </Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

export default Popup