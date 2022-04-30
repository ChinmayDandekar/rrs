import React from 'react'
import logo from '../assets/RRSlogo.svg'
import name from '../assets/RRSname.svg'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'
import Advancedsearch from './AdvancedSearch'
import arrow from '../assets/arrow.svg'
import { auth } from "../firebase";

import { useAuthState } from "react-firebase-hooks/auth";


const Nav = ({ LinkArray = "Home", BackgroundStyle = {}, SearchBar = false, AdvancedSearch=false, autoRecipe, onKeyDown,onSearchTextChange, onClickAutoRecipe, openOrCloseAdvSearchContainer, AdvancedSearchQuery}) => {
   
    const [user, loading, error] = useAuthState(auth);
    const [link, setLink] = React.useState(["contact", 'login', 'register'])
   
    React.useEffect(() => {
        if (user) {
            setLink(['create', 'logout']); 
        } 
        if (LinkArray == "Login") {
            setLink(['contact', 'Home', 'register' ])
        }
        if (LinkArray == "Register") {
            setLink(['contact','Home', 'Login'])
        }
    },[user])


    return (
        <div className="nav" style={BackgroundStyle}>
            <div className='inner-nav flex'>
                <div className="logo-container">"
                    <a href="/">
                        <img src={logo} alt="" />
                        <img src={name} alt="" />
                    </a>
                </div>
                {/* {console.log(SearchBar) } */}
                {SearchBar ? <SearchBox Size={"small"} handleKeyDown={onKeyDown} onSearchTextChange={onSearchTextChange} />:null}

                <ul className="menu">
                    {link.map(link => <div className=" menu-item fw-black" key={link}><Link to={link==="Home"?"/":"/"+link}>{link}</Link></div>) }
                   {user && <div className=" menu-item fw-black">Hello, { user.displayName }</div>} 
                </ul>
                
            </div>

        
            {AdvancedSearch ?
            (autoRecipe.length > 0  ?
                <div className="auto-recipes">
                        {autoRecipe.map((recipe) => {
                        // console.log('hello')`
                        return (
                            <li key={recipe.id} className="auto-recipe" id={ recipe.title } onClick={onClickAutoRecipe}>
                                <h2 id={ recipe.title }>{recipe.title}</h2>
                            </li>
                        )
                    })}
                </div>
                : <div className="advanced-search menu-item fw-black" onClick={openOrCloseAdvSearchContainer}>Advanced Search <span><img src={arrow} className="arrow-icon" alt="" /></span></div>):null}
            <Advancedsearch closeAdvSearchContainer={openOrCloseAdvSearchContainer} AdvancedSearchQuery={AdvancedSearchQuery}/>
        </div>
    )
}

export default Nav;
