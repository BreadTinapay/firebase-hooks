import { useEffect, useState } from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Header from './Components/Header'
import firebase from './firebase'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import CardInput from './Components/CardInput'



function App() {

  //Firebase Firestore logic
  const [home, setHome] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore()
      const data = await db.collection("home").get()
      setHome(data.docs.map(doc => ({...doc.data(), id: doc.id})))
    }
    fetchData()
  }, [])


  return (
    <div className="app">
      <Header/>
      <Switch>
        <Route path={"/"}>
          <Jumbotron style={{ background: "transparent" }}>
          <Container>
            <ul>
            {home.map(home => (
              <>
              <CardInput home={home} />
              <li><h1 key={home.Title}>{home.Title}</h1>
              <h6 key={home.subTitle}>{home.subTitle}</h6>
              <p key={home.Description}>{home.Description}</p>
              </li>
              <Button>Update</Button>
              <br/>
              <br/>
              <br/>
              </>
            ))}
            </ul>
          </Container>
          </Jumbotron>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
