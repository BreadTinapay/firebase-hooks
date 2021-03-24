import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import firebase from "../firebase"

function CreateInput() {
    // ayaw kalimot pag add ug "" sa sud sa useState or else u dead boi
    const [Title, setTitle] = React.useState("") // mao ni para sa input
    const [subTitle, setSubTitle] = React.useState("") // mao ni para sa input
    const [Description, setDescription] = React.useState("") // mao ni para sa input

    const onCreate = () => {
        const db = firebase.firestore();
        db.collection('home').add({ 
            Title: Title,
            subTitle: subTitle,
            Description: Description });
        setTitle("")
        setSubTitle("")
        setDescription("")
      };
    

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

                {/* ayaw kalimot tangtang as type="submit" or else u dead boi */}
                <Button variant="primary" onClick={onCreate} >
                    Add an Entry
                </Button>
            </Form>
    )
}

export default CreateInput
