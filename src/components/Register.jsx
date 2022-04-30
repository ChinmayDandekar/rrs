import React from 'react'
import Nav from './Nav'
import { auth, registerWithEmailAndPassword } from '../firebase'
import { Link, useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth";



const Register = () => {

    const [name,  setName] = React.useState('')
    const [email,  setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();
    


    React.useEffect(() => {
        if (loading) {
            
            return;
        }
        if (user) navigate('/')
        else console.log(error);

    }, [user, loading ,navigate]);
    

    const onClickSetName = (e) => {
        setName(e.target.value)
       
    } 

    const onClickSetEmail = (e) => {
        setEmail(e.target.value)
    }

    const onClickSetPassword = (e) => {
        const label1 = document.querySelector("[label='password1']")
        const label2 = document.querySelector("[label='password2']")
        console.log(label1)
        const password1 = document.querySelector("#password1")
        const password2 = document.querySelector("#password2")

        
        if (password1.value == password2.value ) {
            
            setPassword(e.target.value)
            label1.style.color = "transparent"
            label2.style.color = "transparent"

        } else {
            label1.style.color = "white"
            label2.style.color = "white"
        }
    }
        
    const togglePasswordVisibility = (e) => {
        
        // const password1 = document.querySelector("#password1")
        const password2 = document.querySelector("#password2")
        const icon = document.querySelector(".password-icon")
        console.log(password2)
        if (password2.type == 'text') {
            password2.type = "password"
            icon.classList.add(["bi-eye-fill"]) 
            icon.classList.remove(["bi-eye-slash-fill"]) 
            
        } else {
            password2.type = "text"
            icon.classList.remove("bi-eye-fill") 
            icon.classList.add("bi-eye-slash-fill") 
            
        }
    }


    const onClickRegisterBtn = () => {
        if (name == '') {
            document.querySelector("[label='name']").style.color = "red"
        } else {
            document.querySelector("[label='name']").style.color = "transparent"
            if (email == "") {
            document.querySelector("[label='email']").style.color = "red"
            } else {
                document.querySelector("[label='email']").style.color = "transparent"
                registerWithEmailAndPassword(name,email,password)
            }
            
        }
        
    }



    return (
        <>
            <Nav LinkArray="Register" BackgroundStyle={{ backgroundColor:"transparent",boxShadow:"none"}} />
            <div className="register-container container flex">
            <div className="inner-container right flex">
                <h1>Register<span>.</span></h1>
                <input type="text" name='name' id='name' onChange={ onClickSetName }placeholder='Name' autoComplete='off'/>
                <h3 className="error-msg menu-item" label='name'>Please Enter your name</h3>
                <input type="email" name="email" id='email' onChange={ onClickSetEmail } placeholder='Email' autoComplete='off'/>
                <h3 className="error-msg menu-item" label='email'>Incorrect Email</h3>
                <input type="password" name="password1" id='password1' onChange={ onClickSetPassword } placeholder='Password' autoComplete='off'/>
                <h3 className="error-msg menu-item" label="password1">Incorrect Password</h3>
                {/* <i className="bi bi-eye-slash-fill password-icon" ></i> */}
                <input type="password" name="password2" id='password2'onChange={ onClickSetPassword } placeholder='Confirm Password' autoComplete='off'/>
                <h3 className="error-msg menu-item" label="password2">Incorrect Password</h3>
                <i className="bi bi-eye-slash-fill password-icon" onClick={togglePasswordVisibility}></i>
                <div className='menu-item fw-black'>Forgot Password?</div>
                <div className='socialmedia flex'>
                    <i className="bi bi-facebook"></i>
                    <i className="bi bi-twitter"></i>
                    <i className="bi bi-google"></i>
                </div>
                <button type="button" className="menu-item fw-extrabold" onClick={onClickRegisterBtn}>Register</button>

                
            </div>
             
        </div>
        </>
    )
}

export default Register
