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
import SignInButton from './SignInButton'
import { useStateValue } from '../StateProvider'

function Header() {
    const [dropDown, setDropDown] = React.useState([])
    const [search, setSearch] = React.useState()
    const [{user, admin}] = useStateValue();

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

      const handleSearchButton = () => {
          alert("Under Development...");
          setSearch("Search")
      }

    return (
        <Navbar bg="dark" expand="lg" variant="dark" style={{ width: "100%" }}>
            <Link to={"/"} className="link"><Navbar.Brand href="#home">Bo's Blog</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Link to={"/"} className="link"><Nav.Link href="#home">Home</Nav.Link></Link>
                {
                   admin ? (
                    <Link to={"/edit"} className="link"><Nav.Link href="#edit">Edit Contents</Nav.Link></Link>
                   ) : (
                    <Link to={"/edit"} className="link"><Nav.Link href="#edit" style={{ display: "none" }}>Edit Contents</Nav.Link></Link>
                   )
                }
                <NavDropdown title="Blog Pages" id="basic-nav-dropdown">
                    {
                        dropDown.map(down => (
                            
                            <Link to={`/content/${down.id}`} className="link" key={down.id}>
                                {/* <Link to={"/" + down.subTitle.replace(/\W/g, '-')} className="link"> */}
                                <NavDropdown.Item href={"#" + down.Title} key={down.id}>{down.Title}</NavDropdown.Item>
                            </Link>
                            
                        ))
                    }
                </NavDropdown>
                </Nav>
                <Form inline>

                <FormControl 
                type="text"
                 placeholder="Search"
                  className="mr-sm-2"
                   value={user ? user.email : search}
                    onChange={(e) => setSearch(e.target.value)} 
                    />

                <Button variant="outline-success" onClick={handleSearchButton}>Search</Button>
                </Form>
                <SignInButton />
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
