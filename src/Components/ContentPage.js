import React, { useEffect } from 'react'
import { Container, Jumbotron } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import firebase from '../firebase'

function ContentPage({match}) {
    //Firebase Firestore logic
    const [home, setHome] = React.useState([])

    // home work nimo kay always dapat mutrigger ang useEffect
    useEffect(() => {
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
                    {home.map(data => {
                        if(data.id === match.params.id){
                            console.log("I got It!");
                            return(
                        <div key={data.id}>
                            <h1>{data.Title}</h1>
                            <h4>{data.subTitle}</h4>
                            <p>{data.Description}</p>
                        </div>
                            )
                        }
                    })}
                </Container>
                </Jumbotron>
            </div>
        )
    }

export default ContentPage
