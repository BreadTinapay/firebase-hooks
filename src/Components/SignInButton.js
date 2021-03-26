import React from 'react'
import Button from 'react-bootstrap/Button'
import firebase from '../firebase'
import { useStateValue } from '../StateProvider';

function SignInButton() {
    const [{user, admin}] = useStateValue();

    const auth = firebase.auth();

    var provider = new firebase.auth.GoogleAuthProvider();
    
    const handleLogin = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider)
        console.log(user, admin)
    }
    

    const handleLogout = (e) => {
        e.preventDefault();
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
