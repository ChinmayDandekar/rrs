import React from 'react'
import Nav from './Nav'

import { Link, useNavigate } from "react-router-dom"
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (loading) {
            
            return;
        }
        if (user) navigate('/')
        else console.log(error);

    }, [user, loading ,navigate]);

    return (
        <>
            <Nav LinkArray={['Home','contact','register']}/>
            <div className='login-container container flex'>
            <div className="inner-container left flex">
                <h1>Login<span>.</span></h1>
                    <input type="text" name='username' id='username' placeholder='Username' value={ email} onChange={(e)=> setEmail(e.target.value)} autoComplete='off' />
                <h3 className="error-msg menu-item">Incorrect Username</h3>
                    <input type="password" name='password' id='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off'/>
                <h3 className="error-msg menu-item">Incorrect Password</h3>
                <i className="bi bi-eye-slash-fill password-icon"></i>
                <Link to="/reset" className='menu-item fw-black'>Forgot Password?</Link>
                <div className='socialmedia flex'>
                    <i className="bi bi-facebook"></i>
                    <i className="bi bi-twitter"></i>
                    <i className="bi bi-google" onClick={signInWithGoogle}></i>
                </div>
                <button type="button" className="menu-item fw-extrabold" onClick={()=>logInWithEmailAndPassword(email,password)}>Login</button>

            </div>
        </div>
        </>
    )
}

export default Login
