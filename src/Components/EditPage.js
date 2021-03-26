import React from 'react'
import { Card, Container, Jumbotron } from 'react-bootstrap';
import firebase from '../firebase'
import CreateInput from './CreateInput';
import Popup from './Popup'
import "./EditPage.css"

function EditPage() {
    //Firebase Firestore logic
    const [home, setHome] = React.useState([])


    // home work nimo kay always dapat mutrigger ang useEffect
    React.useEffect(() => {
        const fetchData = async () => {

        const db = firebase.firestore();
        db.collection('home').onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
            items.push({...doc.data(), id: doc.id}) 
            // for delete to work need to add id: doc.id and for update to work need ... before doc.data
            })
            setHome(items)
        })
    }
    fetchData();
    }, [])


    return (
        <div className="arrange">
            <div className="right">
                    <CreateInput />
            </div>

            <div className="left">
                <Jumbotron style={{ background: "transparent" }}>
                    <Container>
                        {home.map(home => (
                            <Card style={{ marginBottom: "10px" }} key={home.id} >
                            <Card.Body>
                            <Card.Title key={home.Title}>{home.Title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted" key={home.subTitle}>{home.subTitle}</Card.Subtitle>
                            <Card.Text key={home.Description}>
                                {home.Description}
                            </Card.Text>
                                <Popup home={home} />
                            </Card.Body>
                        </Card>
                        ))}
                    </Container>
                </Jumbotron>
            </div>
        </div>
        )
    }

export default EditPage

