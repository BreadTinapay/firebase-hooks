import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import "./Header.css"
import firebase from '../firebase'

function Header() {
    const [dropDown, setDropDown] = React.useState([])
    var setString;

    React.useEffect(() => {
        const fetchData = async () => {
          const db = firebase.firestore()
        //   const data = await db.collection("home").get()
        //   setDropDown(data.docs.map(doc => ({...doc.data(), id: doc.id})))
        db.collection('home').onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
              items.push({...doc.data(), id: doc.id})
            })
            setDropDown(items)
          })
     }
        fetchData()
      }, [])

      const formatString=()=>{
        let temp=dropDown.Title;
        temp=temp.replace(/\s+/g, '');
        setString(temp);
    }
    return (
        <Navbar bg="dark" expand="lg" variant="dark" style={{ width: "100%" }}>
            <Link to={"/"} className="link"><Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Link to={"/"} className="link"><Nav.Link href="#home">Home</Nav.Link></Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    {
                        dropDown.map(down => (
                            <>
                            <Link to={"/" + down.Title.replace(/\s+/g, '-')} className="link">
                                <NavDropdown.Item href={down.subTitle} key={down.Title}>{down.Title}</NavDropdown.Item>
                                </Link>
                            </>
                        ))
                    }
                </NavDropdown>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
