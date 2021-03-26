import React from 'react'
import { Card, Container, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from '../firebase'

function Content() {
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
        <div>
            <Jumbotron style={{ background: "transparent" }}>
                <Container>
                    {home.map(homes => (
                        <>
                            <Link 
                            to={"/" + homes.Title.replace(/\W/g, '-')} 
                            style={{ color: "inherit", textDecoration: "none"}}
                            >
                                <Card style={{ width: '100%', marginBottom: "10px" }} key={homes} >
                                    <Card.Body>
                                    <Card.Title key={homes.Title}><h2>{homes.Title}</h2></Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted" key={homes.subTitle}>
                                        <h6>{home.subTitle}</h6>
                                    </Card.Subtitle>
                                    <Card.Text key={homes.Description}>
                                        {homes.Description}
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </>
                    ))}
                </Container>
                </Jumbotron>
            </div>
        )
    }

export default Content
