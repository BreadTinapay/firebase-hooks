import { useEffect, useState } from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Header from './Components/Header'
import firebase from './firebase'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Popup from './Components/Popup'
import CreateInput from './Components/CreateInput';


function App() {

  //Firebase Firestore logic
  const [home, setHome] = useState([])


  // home work nimo kay always dapat mutrigger ang useEffect
  useEffect(() => {
    const fetchData = async () => {

      const db = firebase.firestore()
      // const data = await db.collection("home").get()
      // setHome(data.docs.map(doc => ({...doc.data(), id: doc.id})))
      db.collection('home').onSnapshot((querySnapshot) => {
        const items = []
        querySnapshot.forEach((doc) => {
          items.push({...doc.data(), id: doc.id}) // for delete to work need to add id: doc.id and for update to work need ... before doc.data
        })
        setHome(items)
      })
 }
 fetchData();
  }, [])


  return (
    <div className="app">
      <Header/>
      <Switch>
        {home.map(home => (
          <Route path={"/" + home.Title.replace(/\s+/g, '-') }>
            <Jumbotron style={{ background: "transparent"}}>
              <Container>
                <h1 key={home.Title}>{home.Title}</h1>
                <h6 key={home.subTitle}>{home.subTitle}</h6>
                <p key={home.Description}>{home.Description}</p>
                <br/>
                <br/>
                <br/>
              </Container>
            </Jumbotron>
          </Route>
        ))
          }
        <Route path={"/"}>
          <div className="allBlock">
          <div className="leftBlock">
            <Jumbotron style={{ background: "transparent" }}>
              <Container>
                <CreateInput/>
              </Container>
            </Jumbotron>
          </div>
          <div className="leftRight">
          <Jumbotron style={{ background: "transparent" }}>
          <Container>
            {home.map(home => (
              <>
              <h1 key={home.Title}>{home.Title}</h1>
              <h6 key={home.subTitle}>{home.subTitle}</h6>
              <p key={home.Description}>{home.Description}</p>
              <Popup home={home}/>
              <br/>
              <br/>
              <br/>
              </>
            ))}
          </Container>
          </Jumbotron>
          </div>
          </div>
        </Route>
      </Switch>
    </div>
    
  );
}

export default App;
