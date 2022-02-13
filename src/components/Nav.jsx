import React from 'react'
import logo from '../assets/RRSlogo.svg'
import name from '../assets/RRSname.svg'
import { Routes, Route, Link } from 'react-router-dom'
import SearchBox from './SearchBox'

const Nav = ({ LinkArray = ['contact', 'Login', 'register'], BackgroundStyle={}, SearchBar=false }) => {
    return (
        <div className="nav" style={BackgroundStyle}>
            <div className="logo-container">"
                <a href="/">
                    <img src={logo} alt="" />
                    <img src={name} alt="" />
                </a>
            </div>
            {/* {console.log(SearchBar) } */}
            {SearchBar ? <SearchBox Size={"small"}/>:null}

            <ul className="menu">
                {LinkArray.map(link => <div className="menu-item fw-black" key={link}><Link to={link=="Home"?"/":"/"+link}>{link}</Link></div>) }
                {/* <div className="menu-item fw-black"><Link to='Contact'>Contact</Link></div>
                <div className="menu-item fw-black"><Link to='Login'>Login</Link></div>
                <div className="menu-item fw-black"><Link to='SignUp'>SignUp</Link></div> */}
            </ul>
        </div>
    )
}

export default Nav
