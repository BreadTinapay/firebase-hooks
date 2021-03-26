import { useEffect, useState } from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Header from './Components/Header'
import firebase from './firebase'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import EditPage from './Components/EditPage';
import Content from './Components/Content';
import { useStateValue } from './StateProvider'


function App() {

  //Firebase Firestore logic
  const [home, setHome] = useState([])
  const [{admin}, dispatch] = useStateValue();
  

  // home work nimo kay always dapat mutrigger ang useEffect
  useEffect(() => {
    const fetchData = async () => {

      const db = firebase.firestore();
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
 const auth = firebase.auth();
 const unsubscribe = auth.onAuthStateChanged((authUser) => {
  console.log("auth user is", authUser ? authUser.email : authUser);

  if (authUser) {
    // user just logged in
    dispatch({
      type: "SET_USER",
      user: authUser,
    })
    if(authUser.email === "bo.carilla@gmail.com")
    dispatch({
      type: "CHECK_ADMIN",
      admin: "active",
    })
  } else {
    // user is logged out
    dispatch({
      type: "SET_USER",
      user: null,
    });
    dispatch({
      type: "CHECK_ADMIN",
      admin: null,
    })
  }
});
return () => {
  fetchData();
  unsubscribe()
}
  }, [dispatch])


  return (
    <div className="app">
      <Header/>
      <Switch>
        {home.map(home => (
          <Route path={"/" + home.Title.replace(/\W/g, '-') }>
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
          <Route path={admin ? "/edit" : "/"}>
            {admin ? (
              <Jumbotron style={{ background: "transparent", padding: "20px" }}>
                <Container>
                  <EditPage />
                </Container>
              </Jumbotron>
            ) : (
              <Jumbotron style={{ background: "transparent", padding: "20px" }}>
                <Container>
                  <h1>All contents...</h1>
                  <Content />
                </Container>
              </Jumbotron>
            )}
          </Route>
          <Route path={"/"}>
          <Jumbotron style={{ background: "transparent", padding: "20px" }}>
            <Container>
              <h1>All contents...</h1>
              <Content />
            </Container>
          </Jumbotron>
        </Route>
      </Switch>
    </div>
    
  );
}

export default App;
