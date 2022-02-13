import React from 'react'
import Nav from './Nav'

const Login = () => {
    return (
        <>
            <Nav LinkArray={['Home','contact','register']}/>
            <div className='login-container container flex'>
            <div className="inner-container left flex">
                <h1>Login<span>.</span></h1>
                <input type="text" name='username' id='username' placeholder='Username' autoComplete='off' />
                <h3 className="error-msg menu-item">Incorrect Username</h3>
                <input type="password" name='password' id='password' placeholder='Password' autoComplete='off'/>
                <h3 className="error-msg menu-item">Incorrect Password</h3>
                <i className="bi bi-eye-slash-fill password-icon"></i>
                <div className='menu-item fw-black'>Forgot Password?</div>
                <div className='socialmedia flex'>
                    <i className="bi bi-facebook"></i>
                    <i className="bi bi-twitter"></i>
                    <i className="bi bi-google"></i>
                </div>
                <button type="button" className="menu-item fw-extrabold">Login</button>

            </div>
        </div>
        </>
    )
}

export default Login
