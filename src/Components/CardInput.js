import React from 'react'
import firebase from '../firebase'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const CardInput = ({ home }) => {
    const [Title, setTitle] = React.useState(home.Title)
    const [Description, setDescription] = React.useState(home.Description)
    const [subTitle, setSubTitle] = React.useState(home.subTitle)

    const onUpdate = () => {
        const db = firebase.firestore();
        db.collection('home').doc(home.id).update({...home, Title, subTitle, Description});

        // db.collection('home').doc(home.id).update({...home, subTitle});

        // db.collection('home').doc(home.id).update({...home, Description});
    }

    const onDelete = () => {
        const db = firebase.firestore()
        db.collection('home').doc(home.id).delete()
    }


    return (
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

            <Button variant="primary" onClick={onUpdate()} style={{ marginRight: "10px" }}>
                Update
            </Button>

            <Button variant="primary" onClick={onDelete}>
                Delete
            </Button>
        </Form>
    )
}

export default CardInput
