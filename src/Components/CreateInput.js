import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import firebase from "../firebase"
import { Card, Container, Jumbotron } from 'react-bootstrap'

function CreateInput() {
    // ayaw kalimot pag add ug "" sa sud sa useState or else u dead boi
    const [Title, setTitle] = React.useState("") // mao ni para sa input
    const [subTitle, setSubTitle] = React.useState("") // mao ni para sa input
    const [Description, setDescription] = React.useState("") // mao ni para sa input

    const onCreate = () => {
        if(Title === "" ||  Description === "" || subTitle === ""){
            alert("Please don't leave the forms empty");
        } else {
        const db = firebase.firestore();
        db.collection('home').add({ 
            Title: Title,
            subTitle: subTitle,
            Description: Description });
        setTitle("")
        setSubTitle("")
        setDescription("")
        }
        alert(Title + " has been created")
      };

    

    return (
        <Jumbotron style={{ background: "transparent" }} >
            <Container>
                <Card style={{ border: "1px solid lightgrey", borderRadius: '4px' }}>
                    <Card.Header as="h5">Add Contents Here</Card.Header>
                    <Card.Body>
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
                                <Button variant="primary" onClick={onCreate} style={{ float: "right" }}>
                                    Add an Entry
                                </Button>
                            </Form>
                    </Card.Body>
                </Card>
        </Container>
        </Jumbotron>
            
    )
}

export default CreateInput
