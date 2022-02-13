import React from 'react'
import Nav from './Nav'

const Register = () => {
    return (
        <>
            <Nav LinkArray={['Home','Contact','Login']} BackgroundStyle={{ backgroundColor:"transparent",boxShadow:"none"}} />
            <div className="register-container container flex">
            <div className="inner-container right flex">
                <h1>Register<span>.</span></h1>
                <input type="text" name='name' id='name' placeholder='Name' />
                <h3 className="error-msg menu-item">Incorrect Name</h3>
                <input type="email" name="email" id='email' placeholder='Email' />
                <h3 className="error-msg menu-item">Incorrect Email</h3>
                <input type="username1" name="username1" id='username1' placeholder='Username' />
                <h3 className="error-msg menu-item">Incorrect Username</h3>
                <input type="password1" name="password1" id='password1' placeholder='Password' />
                <h3 className="error-msg menu-item">Incorrect Password</h3>
                <i className="bi bi-eye-slash-fill password-icon"></i>
                <input type="password2" name="password2" id='password2' placeholder='Confirm Password' />
                <h3 className="error-msg menu-item">Incorrect Password</h3>
                <i className="bi bi-eye-slash-fill password-icon"></i>
                <div className='menu-item fw-black'>Forgot Password?</div>
                <div className='socialmedia flex'>
                    <i className="bi bi-facebook"></i>
                    <i className="bi bi-twitter"></i>
                    <i className="bi bi-google"></i>
                </div>
                <button type="button" className="menu-item fw-extrabold">Register</button>

                
            </div>
             
        </div>
        </>
    )
}

export default Register
