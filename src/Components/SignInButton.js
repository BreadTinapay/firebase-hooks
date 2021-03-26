import React from 'react'
import Button from 'react-bootstrap/Button'
import firebase from '../firebase'
import { useStateValue } from '../StateProvider';
import { useHistory } from 'react-router-dom'

function SignInButton() {
    const [{user, admin}] = useStateValue();
    const history = useHistory();
    const auth = firebase.auth();

    var provider = new firebase.auth.GoogleAuthProvider();
    
    const handleLogin = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider)
        console.log(user, admin)
    }
    

    const handleLogout = (e) => {
        e.preventDefault();
        history.push("/");
        auth.signOut();
        console.log(user, admin)

    }

    return (
        <>
        <Button variant="success" onClick={user ? handleLogout : handleLogin } style={{ marginLeft: "5px" }}>{user ? "Logout" : "Login"}</Button>
        </>
    )
}

export default SignInButton
